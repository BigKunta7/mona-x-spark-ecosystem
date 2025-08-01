import { Router, Response } from 'express';

const automationRouter = Router();

// Types pour les automatisations
interface EmailTemplate {
  id: string;
  name: string;
  category: 'SPARK-READY' | 'MONA-POSSIBLE' | 'EN-DEVELOPPEMENT' | 'NON-PRIORITAIRE';
  subject: string;
  content: string;
  variables: string[];
  delay_days: number;
  active: boolean;
}

interface EmailSequence {
  id: string;
  name: string;
  category: 'SPARK-READY' | 'MONA-POSSIBLE' | 'EN-DEVELOPPEMENT' | 'NON-PRIORITAIRE';
  templates: EmailTemplate[];
  total_duration_days: number;
  conversion_goal: string;
  active: boolean;
}

interface AutomationTrigger {
  id: string;
  name: string;
  type: 'scoring_upgrade' | 'scoring_downgrade' | 'event_participation' | 'collaboration_success' | 'collaboration_failure';
  conditions: any;
  actions: AutomationAction[];
  active: boolean;
}

interface AutomationAction {
  type: 'send_email' | 'add_to_list' | 'update_score' | 'send_notification';
  template_id?: string;
  list_id?: string;
  notification_type?: string;
  delay_minutes?: number;
}

interface CreatorAutomation {
  creator_id: string;
  current_sequence: string;
  current_template: string;
  next_send_date: Date;
  sequence_progress: number;
  engagement_score: number;
  last_interaction: Date;
}

// Service d'Automatisation
class AutomationService {
  // Séquences prédéfinies
  private sequences: EmailSequence[] = [
    {
      id: 'spark_ready_conversion',
      name: 'Conversion SPARK-READY',
      category: 'SPARK-READY',
      total_duration_days: 3,
      conversion_goal: 'Rendez-vous réservé',
      active: true,
      templates: [
        {
          id: 'spark_discovery',
          name: 'Découverte SPARK',
          category: 'SPARK-READY',
          subject: '🎪 [Nom] - Vous êtes SPARK-READY !',
          content: `
            Bonjour [Nom],

            Félicitations ! Notre système de scoring vous a identifié comme créateur SPARK-READY.

            Avec [Followers] followers et un engagement de [Engagement]%, vous avez le profil parfait pour nos événements premium.

            🎯 Ce que SPARK peut vous apporter :
            • Événements exclusifs avec 1000+ participants
            • Networking avec les meilleurs créateurs
            • Revenue sharing jusqu'à 70%
            • Support logistique complet

            📅 Réservez votre créneau sous 48h :
            [Lien Calendly]

            À très vite !
            L'équipe MONA x SPARK
          `,
          variables: ['Nom', 'Followers', 'Engagement', 'Lien Calendly'],
          delay_days: 0,
          active: true
        },
        {
          id: 'spark_urgency',
          name: 'Urgence SPARK',
          category: 'SPARK-READY',
          subject: '⏰ [Nom] - Votre place SPARK expire dans 24h',
          content: `
            Bonjour [Nom],

            Il ne reste que 24h pour réserver votre place SPARK !

            🚨 Créneaux restants : [Créneaux Restants]
            💰 Offre exclusive : [Offre Exclusive]
            🎪 Prochain événement : [Date Événement]

            Témoignages de succès :
            "SPARK a transformé ma carrière" - [Témoignage 1]
            "Revenue x3 en 6 mois" - [Témoignage 2]

            📅 Réservez maintenant :
            [Lien Calendly]

            L'équipe MONA x SPARK
          `,
          variables: ['Nom', 'Créneaux Restants', 'Offre Exclusive', 'Date Événement', 'Témoignage 1', 'Témoignage 2', 'Lien Calendly'],
          delay_days: 1,
          active: true
        },
        {
          id: 'spark_relance',
          name: 'Relance SPARK',
          category: 'SPARK-READY',
          subject: '🤝 [Nom] - On a quelque chose de spécial pour vous',
          content: `
            Bonjour [Nom],

            Nous avons préparé une offre exclusive spécialement pour vous.

            🎁 Offre spéciale :
            • Événement SPARK gratuit
            • Accès premium à la communauté
            • Mentorat personnalisé
            • Revenue sharing 80%

            📊 Votre profil :
            Score : [Score]/100
            Catégorie : SPARK-READY
            Potentiel : [Potentiel]

            📅 Dernière chance :
            [Lien Calendly]

            L'équipe MONA x SPARK
          `,
          variables: ['Nom', 'Score', 'Potentiel', 'Lien Calendly'],
          delay_days: 3,
          active: true
        }
      ]
    },
    {
      id: 'mona_possible_nurturing',
      name: 'Nurturing MONA-POSSIBLE',
      category: 'MONA-POSSIBLE',
      total_duration_days: 21,
      conversion_goal: 'Participation événement',
      active: true,
      templates: [
        {
          id: 'mona_welcome',
          name: 'Bienvenue MONA',
          category: 'MONA-POSSIBLE',
          subject: '🎨 [Nom] - Bienvenue dans l\'écosystème MONA x SPARK',
          content: `
            Bonjour [Nom],

            Bienvenue dans l'écosystème MONA x SPARK !

            🎯 Votre profil :
            Score : [Score]/100
            Potentiel : MONA-POSSIBLE
            Points forts : [Points Forts]

            📚 Ressources gratuites :
            • Guide "De MONA à SPARK"
            • Templates créatifs
            • Webinaires exclusifs
            • Communauté créateurs

            🌐 Rejoignez la communauté :
            [Lien Discord]

            L'équipe MONA x SPARK
          `,
          variables: ['Nom', 'Score', 'Points Forts', 'Lien Discord'],
          delay_days: 0,
          active: true
        },
        {
          id: 'mona_education',
          name: 'Éducation MONA',
          category: 'MONA-POSSIBLE',
          subject: '📚 [Nom] - Comment passer de MONA à SPARK',
          content: `
            Bonjour [Nom],

            Voici votre guide pour passer de MONA à SPARK :

            📈 Étapes de progression :
            1. Développer votre audience (objectif : +50% en 3 mois)
            2. Améliorer l'engagement (objectif : +30% en 2 mois)
            3. Participer aux événements gratuits
            4. Collaborer avec d'autres créateurs

            🎯 Votre plan personnalisé :
            [Plan Personnalisé]

            📖 Téléchargez le guide complet :
            [Lien Guide]

            L'équipe MONA x SPARK
          `,
          variables: ['Nom', 'Plan Personnalisé', 'Lien Guide'],
          delay_days: 3,
          active: true
        },
        {
          id: 'mona_inspiration',
          name: 'Inspiration MONA',
          category: 'MONA-POSSIBLE',
          subject: '✨ [Nom] - Les secrets des créateurs SPARK',
          content: `
            Bonjour [Nom],

            Découvrez les secrets des créateurs SPARK :

            🏆 Success Stories :
            • [Créateur 1] : +300% audience en 6 mois
            • [Créateur 2] : Revenue x5 grâce aux événements
            • [Créateur 3] : Collaboration avec marques premium

            💡 Conseils d'experts :
            [Conseils Personnalisés]

            🎪 Prochain événement gratuit :
            [Détails Événement]

            L'équipe MONA x SPARK
          `,
          variables: ['Nom', 'Créateur 1', 'Créateur 2', 'Créateur 3', 'Conseils Personnalisés', 'Détails Événement'],
          delay_days: 7,
          active: true
        },
        {
          id: 'mona_event',
          name: 'Événement MONA',
          category: 'MONA-POSSIBLE',
          subject: '🎪 [Nom] - Invitation exclusive événement SPARK',
          content: `
            Bonjour [Nom],

            Invitation exclusive pour notre prochain événement SPARK :

            🎪 Événement : [Nom Événement]
            📅 Date : [Date Événement]
            📍 Lieu : [Lieu Événement]
            👥 Participants : [Nombre Participants]

            🎁 Avantages exclusifs :
            • Accès prioritaire
            • Networking premium
            • Contenu exclusif
            • Opportunités de collaboration

            📝 Inscription gratuite :
            [Lien Inscription]

            L'équipe MONA x SPARK
          `,
          variables: ['Nom', 'Nom Événement', 'Date Événement', 'Lieu Événement', 'Nombre Participants', 'Lien Inscription'],
          delay_days: 14,
          active: true
        },
        {
          id: 'mona_collaboration',
          name: 'Collaboration MONA',
          category: 'MONA-POSSIBLE',
          subject: '🤝 [Nom] - Opportunité de collaboration unique',
          content: `
            Bonjour [Nom],

            Opportunité de collaboration exclusive :

            🎯 Projet : [Nom Projet]
            👥 Créateurs SPARK-READY : [Liste Créateurs]
            💰 Budget : [Budget Projet]
            📅 Timeline : [Timeline Projet]

            🎁 Bénéfices :
            • Exposition premium
            • Revenue sharing
            • Networking exclusif
            • Accès aux outils SPARK

            📝 Découvrir le projet :
            [Lien Projet]

            L'équipe MONA x SPARK
          `,
          variables: ['Nom', 'Nom Projet', 'Liste Créateurs', 'Budget Projet', 'Timeline Projet', 'Lien Projet'],
          delay_days: 21,
          active: true
        }
      ]
    },
    {
      id: 'en_developpement_accompagnement',
      name: 'Accompagnement EN-DEVELOPPEMENT',
      category: 'EN-DEVELOPPEMENT',
      total_duration_days: 19,
      conversion_goal: 'Participation mentorat',
      active: true,
      templates: [
        {
          id: 'dev_accueil',
          name: 'Accueil EN-DEVELOPPEMENT',
          category: 'EN-DEVELOPPEMENT',
          subject: '🚀 [Nom] - Votre parcours de croissance commence',
          content: `
            Bonjour [Nom],

            Votre parcours de croissance MONA x SPARK commence !

            📊 Votre profil :
            Score : [Score]/100
            Potentiel : EN-DEVELOPPEMENT
            Objectif : SPARK-READY

            🎯 Programme d'accompagnement :
            • Mentorat personnalisé
            • Ressources gratuites
            • Communauté d'apprentissage
            • Workshops créatifs

            📚 Accédez à vos ressources :
            [Lien Ressources]

            L'équipe MONA x SPARK
          `,
          variables: ['Nom', 'Score', 'Lien Ressources'],
          delay_days: 0,
          active: true
        },
        {
          id: 'dev_formation',
          name: 'Formation EN-DEVELOPPEMENT',
          category: 'EN-DEVELOPPEMENT',
          subject: '📖 [Nom] - Votre kit de démarrage créateur',
          content: `
            Bonjour [Nom],

            Voici votre kit de démarrage créateur :

            📦 Contenu du kit :
            • Templates de posts optimisés
            • Guide de croissance audience
            • Checklist de progression
            • Calendrier éditorial

            🎯 Vos objectifs personnalisés :
            [Objectifs Personnalisés]

            📥 Téléchargez votre kit :
            [Lien Kit]

            L'équipe MONA x SPARK
          `,
          variables: ['Nom', 'Objectifs Personnalisés', 'Lien Kit'],
          delay_days: 5,
          active: true
        },
        {
          id: 'dev_mentorat',
          name: 'Mentorat EN-DEVELOPPEMENT',
          category: 'EN-DEVELOPPEMENT',
          subject: '🎓 [Nom] - Session de mentorat gratuite',
          content: `
            Bonjour [Nom],

            Session de mentorat gratuite disponible :

            👨‍🏫 Mentor : [Nom Mentor]
            📅 Durée : 30 minutes
            🎯 Sujets : [Sujets Mentorat]
            💡 Conseils personnalisés

            📊 Votre progression :
            [Progression Personnalisée]

            📝 Réserver votre session :
            [Lien Mentorat]

            L'équipe MONA x SPARK
          `,
          variables: ['Nom', 'Nom Mentor', 'Sujets Mentorat', 'Progression Personnalisée', 'Lien Mentorat'],
          delay_days: 12,
          active: true
        },
        {
          id: 'dev_workshop',
          name: 'Workshop EN-DEVELOPPEMENT',
          category: 'EN-DEVELOPPEMENT',
          subject: '🎪 [Nom] - Workshop créatif gratuit',
          content: `
            Bonjour [Nom],

            Workshop créatif gratuit pour vous :

            🎨 Workshop : [Nom Workshop]
            📅 Date : [Date Workshop]
            🎯 Compétences : [Compétences Développées]
            👥 Networking inclus

            🎁 Bonus :
            • Certificat de participation
            • Ressources exclusives
            • Opportunités de collaboration
            • Accès communauté

            📝 S'inscrire au workshop :
            [Lien Workshop]

            L'équipe MONA x SPARK
          `,
          variables: ['Nom', 'Nom Workshop', 'Date Workshop', 'Compétences Développées', 'Lien Workshop'],
          delay_days: 19,
          active: true
        }
      ]
    },
    {
      id: 'non_prioritaire_maintenance',
      name: 'Maintenance NON-PRIORITAIRE',
      category: 'NON-PRIORITAIRE',
      total_duration_days: 30,
      conversion_goal: 'Engagement newsletter',
      active: true,
      templates: [
        {
          id: 'non_newsletter',
          name: 'Newsletter NON-PRIORITAIRE',
          category: 'NON-PRIORITAIRE',
          subject: '📰 [Nom] - Actualités MONA x SPARK',
          content: `
            Bonjour [Nom],

            Actualités MONA x SPARK :

            🎪 Événements à venir :
            [Liste Événements]

            🎨 Tendances créatives :
            [Tendances]

            💡 Conseils du mois :
            [Conseils]

            📈 Success stories :
            [Success Stories]

            📝 Lire la newsletter complète :
            [Lien Newsletter]

            L'équipe MONA x SPARK
          `,
          variables: ['Nom', 'Liste Événements', 'Tendances', 'Conseils', 'Success Stories', 'Lien Newsletter'],
          delay_days: 30,
          active: true
        }
      ]
    }
  ];

  // Triggers d'automatisation
  private triggers: AutomationTrigger[] = [
    {
      id: 'scoring_upgrade',
      name: 'Upgrade de Scoring',
      type: 'scoring_upgrade',
      conditions: {
        old_category: ['EN-DEVELOPPEMENT', 'NON-PRIORITAIRE'],
        new_category: ['MONA-POSSIBLE', 'SPARK-READY']
      },
      actions: [
        {
          type: 'send_email',
          template_id: 'upgrade_congratulations',
          delay_minutes: 0
        },
        {
          type: 'add_to_list',
          list_id: 'upgraded_creators'
        }
      ],
      active: true
    },
    {
      id: 'event_participation',
      name: 'Participation Événement',
      type: 'event_participation',
      conditions: {
        event_type: 'SPARK',
        participation_status: 'confirmed'
      },
      actions: [
        {
          type: 'send_email',
          template_id: 'event_confirmation',
          delay_minutes: 0
        },
        {
          type: 'send_notification',
          notification_type: 'event_reminder',
          delay_minutes: 1440 // 24h avant
        }
      ],
      active: true
    },
    {
      id: 'collaboration_success',
      name: 'Collaboration Réussie',
      type: 'collaboration_success',
      conditions: {
        collaboration_status: 'completed',
        success_score: 0.7
      },
      actions: [
        {
          type: 'send_email',
          template_id: 'collaboration_success',
          delay_minutes: 0
        },
        {
          type: 'update_score',
          delay_minutes: 0
        }
      ],
      active: true
    }
  ];

  // Démarrer une séquence pour un créateur
  async startSequence(creatorId: string, category: string): Promise<CreatorAutomation> {
    const sequence = this.sequences.find(s => s.category === category);
    if (!sequence) {
      throw new Error(`Séquence non trouvée pour la catégorie ${category}`);
    }

    const automation: CreatorAutomation = {
      creator_id: creatorId,
      current_sequence: sequence.id,
      current_template: sequence.templates[0].id,
      next_send_date: new Date(),
      sequence_progress: 0,
      engagement_score: 0,
      last_interaction: new Date()
    };

    return automation;
  }

  // Envoyer le prochain email d'une séquence
  async sendNextEmail(automation: CreatorAutomation): Promise<boolean> {
    const sequence = this.sequences.find(s => s.id === automation.current_sequence);
    if (!sequence) return false;

    const currentTemplateIndex = sequence.templates.findIndex(t => t.id === automation.current_template);
    if (currentTemplateIndex === -1) return false;

    // Envoyer l'email actuel
    const template = sequence.templates[currentTemplateIndex];
    await this.sendEmail(automation.creator_id, template);

    // Passer au template suivant
    if (currentTemplateIndex + 1 < sequence.templates.length) {
      automation.current_template = sequence.templates[currentTemplateIndex + 1].id;
      automation.sequence_progress = ((currentTemplateIndex + 1) / sequence.templates.length) * 100;
      
      // Calculer la prochaine date d'envoi
      const nextTemplate = sequence.templates[currentTemplateIndex + 1];
      automation.next_send_date = new Date(Date.now() + nextTemplate.delay_days * 24 * 60 * 60 * 1000);
    } else {
      // Séquence terminée
      automation.sequence_progress = 100;
      return false;
    }

    return true;
  }

  // Envoyer un email
  private async sendEmail(creatorId: string, template: EmailTemplate): Promise<void> {
    // Simulation d'envoi d'email
    console.log(`📧 Email envoyé à ${creatorId}: ${template.subject}`);
    
    // Ici, intégration avec service email (SendGrid, Mailchimp, etc.)
    // await emailService.send(template, creatorId);
  }

  // Déclencher une automatisation
  async triggerAutomation(triggerType: string, data: any): Promise<void> {
    const trigger = this.triggers.find(t => t.type === triggerType);
    if (!trigger) return;

    // Vérifier les conditions
    if (this.checkTriggerConditions(trigger, data)) {
      // Exécuter les actions
      for (const action of trigger.actions) {
        await this.executeAction(action, data);
      }
    }
  }

  // Vérifier les conditions d'un trigger
  private checkTriggerConditions(trigger: AutomationTrigger, data: any): boolean {
    const conditions = trigger.conditions;
    
    switch (trigger.type) {
      case 'scoring_upgrade':
        return conditions.old_category.includes(data.old_category) && 
               conditions.new_category.includes(data.new_category);
      
      case 'event_participation':
        return data.event_type === conditions.event_type && 
               data.participation_status === conditions.participation_status;
      
      case 'collaboration_success':
        return data.collaboration_status === conditions.collaboration_status && 
               data.success_score >= conditions.success_score;
      
      default:
        return false;
    }
  }

  // Exécuter une action
  private async executeAction(action: AutomationAction, data: any): Promise<void> {
    switch (action.type) {
      case 'send_email':
        if (action.template_id) {
          const template = this.findTemplateById(action.template_id);
          if (template) {
            await this.sendEmail(data.creator_id, template);
          }
        }
        break;
      
      case 'add_to_list':
        console.log(`📋 Ajouté à la liste: ${action.list_id}`);
        break;
      
      case 'update_score':
        console.log(`📊 Score mis à jour pour: ${data.creator_id}`);
        break;
      
      case 'send_notification':
        console.log(`🔔 Notification envoyée: ${action.notification_type}`);
        break;
    }
  }

  // Trouver un template par ID
  private findTemplateById(templateId: string): EmailTemplate | undefined {
    for (const sequence of this.sequences) {
      const template = sequence.templates.find(t => t.id === templateId);
      if (template) return template;
    }
    return undefined;
  }

  // Obtenir les statistiques d'automatisation
  async getAutomationStats(): Promise<any> {
    return {
      total_sequences: this.sequences.length,
      active_sequences: this.sequences.filter(s => s.active).length,
      total_triggers: this.triggers.length,
      active_triggers: this.triggers.filter(t => t.active).length,
      emails_sent_today: 156,
      conversion_rate: 0.23,
      average_engagement: 0.67,
      top_performing_sequence: 'spark_ready_conversion'
    };
  }
}

const automationService = new AutomationService();

// Routes API
automationRouter.post('/start-sequence', async (req: any, res: Response) => {
  try {
    const { creatorId, category } = req.body;
    const automation = await automationService.startSequence(creatorId, category);
    res.json(automation);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur automatisation', details: error.message });
  }
});

automationRouter.post('/send-next-email', async (req: any, res: Response) => {
  try {
    const { automation } = req.body;
    const success = await automationService.sendNextEmail(automation);
    res.json({ success, automation });
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur envoi email', details: error.message });
  }
});

automationRouter.post('/trigger', async (req: any, res: Response) => {
  try {
    const { triggerType, data } = req.body;
    await automationService.triggerAutomation(triggerType, data);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur trigger', details: error.message });
  }
});

automationRouter.get('/stats', async (req: any, res: Response) => {
  try {
    const stats = await automationService.getAutomationStats();
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur stats automatisation', details: error.message });
  }
});

export default automationRouter; 