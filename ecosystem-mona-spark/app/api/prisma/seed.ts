import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seed...');

  // Hash des mots de passe
  const passwordHash = await bcrypt.hash('password123', 10);

  // Créer les utilisateurs admin
  const adminUsers = await Promise.all([
    prisma.users.create({
      data: {
        email: 'admin@mona-spark.com',
        password_hash: passwordHash,
        first_name: 'Admin',
        last_name: 'MONA',
        user_type: 'ADMIN',
        phone: '+33 6 12 34 56 78',
        nda_signed: true,
        consent_marketing: true,
        consent_analytics: true
      }
    }),
    prisma.users.create({
      data: {
        email: 'marie@mona-spark.com',
        password_hash: passwordHash,
        first_name: 'Marie',
        last_name: 'Manager',
        user_type: 'ADMIN',
        phone: '+33 6 98 76 54 32',
        nda_signed: true,
        consent_marketing: true,
        consent_analytics: true
      }
    }),
    prisma.users.create({
      data: {
        email: 'thomas@mona-spark.com',
        password_hash: passwordHash,
        first_name: 'Thomas',
        last_name: 'Negociator',
        user_type: 'ADMIN',
        phone: '+33 6 45 67 89 01',
        nda_signed: true,
        consent_marketing: true,
        consent_analytics: true
      }
    })
  ]);

  console.log('✅ Utilisateurs admin créés');

  // Créer les artistes
  const artists = await Promise.all([
    prisma.artists.create({
      data: {
        id: adminUsers[0].id,
        artist_name: 'Alex Rivera',
        genre: 'Hip-Hop',
        followers_count: 25000,
        score_mona: 87,
        market_fit_score: 92,
        level: 'qualified',
        bio: 'Artiste prometteur avec une audience engagée. Intéressé par SPARK Villa.',
        social_media: {
          instagram: '@alexrivera',
          tiktok: '@alexrivera',
          youtube: 'Alex Rivera'
        }
      }
    }),
    prisma.artists.create({
      data: {
        id: adminUsers[1].id,
        artist_name: 'Sarah Chen',
        genre: 'Pop',
        followers_count: 45000,
        score_mona: 92,
        market_fit_score: 88,
        level: 'negotiation',
        bio: 'Artiste établie avec un fort potentiel viral. Négociation en cours pour contrat exclusif.',
        social_media: {
          instagram: '@sarahchen',
          tiktok: '@sarahchen',
          youtube: 'Sarah Chen'
        }
      }
    })
  ]);

  console.log('✅ Artistes créés');

  // Créer les interactions
  const interactions = await Promise.all([
    prisma.interactions.create({
      data: {
        artist_id: artists[0].id,
        type: 'CALL',
        description: 'Appel de qualification - très réceptif',
        outcome: 'positive',
        next_action: 'Envoyer proposition SPARK',
        assigned_to: 'Marie'
      }
    }),
    prisma.interactions.create({
      data: {
        artist_id: artists[1].id,
        type: 'MEETING',
        description: 'Rencontre en personne - excellente chimie',
        outcome: 'very-positive',
        next_action: 'Présenter contrat final',
        assigned_to: 'Thomas'
      }
    })
  ]);

  console.log('✅ Interactions créées');

  // Créer les opportunités
  const opportunities = await Promise.all([
    prisma.opportunities.create({
      data: {
        artist_id: artists[0].id,
        title: 'SPARK Villa Session',
        value: 5000,
        probability: 80,
        stage: 'PROPOSAL',
        expected_close: new Date('2024-02-15'),
        description: 'Participation à la prochaine villa SPARK'
      }
    }),
    prisma.opportunities.create({
      data: {
        artist_id: artists[1].id,
        title: 'Contrat Exclusif MONA',
        value: 25000,
        probability: 75,
        stage: 'NEGOTIATION',
        expected_close: new Date('2024-02-01'),
        description: 'Contrat de management exclusif 2 ans'
      }
    })
  ]);

  console.log('✅ Opportunités créées');

  // Créer les villas SPARK
  const villas = await Promise.all([
    prisma.sparkVillas.create({
      data: {
        name: 'Villa SPARK Hip-Hop',
        location: 'Villa créative Paris',
        start_date: new Date('2024-02-01'),
        end_date: new Date('2024-02-07'),
        genre: 'Hip-Hop',
        max_participants: 8,
        current_participants: 3,
        status: 'OPEN',
        budget_total: 15000,
        budget_spent: 5000
      }
    }),
    prisma.sparkVillas.create({
      data: {
        name: 'Villa SPARK Pop',
        location: 'Villa créative Lyon',
        start_date: new Date('2024-03-01'),
        end_date: new Date('2024-03-07'),
        genre: 'Pop',
        max_participants: 10,
        current_participants: 0,
        status: 'PLANNING',
        budget_total: 20000,
        budget_spent: 0
      }
    })
  ]);

  console.log('✅ Villas SPARK créées');

  // Créer les candidatures SPARK
  const applications = await Promise.all([
    prisma.sparkApplication.create({
      data: {
        artist_id: artists[0].id,
        villa_id: villas[0].id,
        motivation_text: 'Je souhaite participer à cette villa pour développer mon projet artistique et rencontrer d\'autres créateurs.',
        status: 'ACCEPTED'
      }
    })
  ]);

  console.log('✅ Candidatures SPARK créées');

  // Créer les tâches
  const tasks = await Promise.all([
    prisma.tasks.create({
      data: {
        title: 'Finaliser brief Alex Rivera',
        description: 'Préparer le brief complet pour la villa SPARK',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        assignee_id: adminUsers[1].id,
        due_date: new Date('2024-01-23'),
        estimated_hours: 4,
        actual_hours: 2,
        tags: ['brief', 'villa']
      }
    }),
    prisma.tasks.create({
      data: {
        title: 'Review contrat Sarah Chen',
        description: 'Réviser et négocier les termes du contrat',
        status: 'REVIEW',
        priority: 'URGENT',
        assignee_id: adminUsers[2].id,
        due_date: new Date('2024-01-24'),
        estimated_hours: 6,
        actual_hours: 4,
        tags: ['contrat', 'négociation']
      }
    }),
    prisma.tasks.create({
      data: {
        title: 'Préparer présentation sponsors',
        description: 'Créer la présentation pour les nouveaux sponsors',
        status: 'TODO',
        priority: 'MEDIUM',
        assignee_id: adminUsers[1].id,
        due_date: new Date('2024-01-26'),
        estimated_hours: 3,
        actual_hours: 0,
        tags: ['présentation', 'sponsors']
      }
    })
  ]);

  console.log('✅ Tâches créées');

  // Créer les événements
  const events = await Promise.all([
    prisma.events.create({
      data: {
        title: 'Réunion Équipe MONA',
        description: 'Review hebdomadaire des artistes et prospects',
        start_date: new Date('2024-01-22T10:00:00'),
        end_date: new Date('2024-01-22T11:30:00'),
        type: 'MEETING',
        color: 'purple',
        attendees: ['Marie', 'Thomas', 'Sarah'],
        location: 'Bureau principal',
        user_id: adminUsers[0].id
      }
    }),
    prisma.events.create({
      data: {
        title: 'Villa SPARK - Session 1',
        description: 'Première session de la villa créative',
        start_date: new Date('2024-01-23T14:00:00'),
        end_date: new Date('2024-01-23T18:00:00'),
        type: 'VILLA',
        color: 'green',
        attendees: ['Alex Rivera', 'Sarah Chen', 'Équipe SPARK'],
        location: 'Villa créative',
        villa_id: villas[0].id
      }
    }),
    prisma.events.create({
      data: {
        title: 'Deadline - Contrat Alex',
        description: 'Finalisation du contrat exclusif',
        start_date: new Date('2024-01-24T17:00:00'),
        end_date: new Date('2024-01-24T17:00:00'),
        type: 'DEADLINE',
        color: 'red',
        attendees: ['Thomas'],
        location: 'Bureau',
        user_id: adminUsers[2].id
      }
    })
  ]);

  console.log('✅ Événements créés');

  // Créer les workflows d'automation
  const workflows = await Promise.all([
    prisma.automationSequences.create({
      data: {
        name: 'Onboarding Artiste',
        description: 'Automatisation complète du processus d\'onboarding',
        triggers: ['Nouvel artiste inscrit', 'Profil complété'],
        actions: ['Envoi email de bienvenue', 'Création dossier', 'Assignation mentor'],
        status: 'ACTIVE',
        last_run: new Date('2024-01-20'),
        next_run: new Date('2024-01-22'),
        success_rate: 95
      }
    }),
    prisma.automationSequences.create({
      data: {
        name: 'Suivi Villa SPARK',
        description: 'Automatisation du suivi des villas créatives',
        triggers: ['Réservation villa', 'Check-in artiste'],
        actions: ['Envoi kit préparation', 'Création planning', 'Notifications équipe'],
        status: 'ACTIVE',
        last_run: new Date('2024-01-19'),
        next_run: new Date('2024-01-25'),
        success_rate: 88
      }
    }),
    prisma.automationSequences.create({
      data: {
        name: 'Analytics Reporting',
        description: 'Rapports automatiques de performance',
        triggers: ['Fin de semaine', 'Fin de mois'],
        actions: ['Génération rapport', 'Envoi équipe', 'Mise à jour dashboard'],
        status: 'ACTIVE',
        last_run: new Date('2024-01-21'),
        next_run: new Date('2024-01-28'),
        success_rate: 92
      }
    })
  ]);

  console.log('✅ Workflows d\'automation créés');

  // Créer les blocs marketplace
  const marketplaceBlocks = await Promise.all([
    prisma.marketplaceBlocks.create({
      data: {
        title: 'Signature & Onboarding',
        description: 'Due diligence, contrat, activation complète',
        icon: '📋',
        features: [
          'Audit complet du profil artistique',
          'Négociation et rédaction de contrats',
          'Processus d\'activation et d\'intégration',
          'Suivi post-signature'
        ],
        price: 'Sur devis',
        duration: '2-4 semaines',
        experts_count: 3,
        success_rate: 95,
        is_active: true
      }
    }),
    prisma.marketplaceBlocks.create({
      data: {
        title: 'Direction Artistique & A&R',
        description: 'Coaching créatif, supervision, cohérence',
        icon: '🎨',
        features: [
          'Développement de l\'identité artistique',
          'Supervision des projets créatifs',
          'Coaching personnalisé',
          'Stratégie de développement'
        ],
        price: 'Sur devis',
        duration: 'Ongoing',
        experts_count: 5,
        success_rate: 90,
        is_active: true
      }
    }),
    prisma.marketplaceBlocks.create({
      data: {
        title: 'Production Musicale',
        description: 'Studios partenaires, packages prod',
        icon: '🎵',
        features: [
          'Production de beats et arrangements',
          'Mixage et mastering professionnel',
          'Accès aux studios partenaires',
          'Packages production personnalisés'
        ],
        price: 'Sur devis',
        duration: '1-8 semaines',
        experts_count: 8,
        success_rate: 88,
        is_active: true
      }
    })
  ]);

  console.log('✅ Blocs marketplace créés');

  // Créer les communications
  const communications = await Promise.all([
    prisma.communications.create({
      data: {
        user_id: artists[0].id,
        type: 'EMAIL',
        subject: 'Bienvenue chez MONA x SPARK',
        content: 'Bienvenue Alex ! Nous sommes ravis de vous accueillir dans l\'écosystème MONA x SPARK.',
        status: 'SENT',
        sent_at: new Date('2024-01-15')
      }
    }),
    prisma.communications.create({
      data: {
        user_id: artists[1].id,
        type: 'EMAIL',
        subject: 'Proposition Villa SPARK',
        content: 'Sarah, nous avons une proposition spéciale pour vous concernant la prochaine villa SPARK.',
        status: 'SENT',
        sent_at: new Date('2024-01-18')
      }
    })
  ]);

  console.log('✅ Communications créées');

  // Créer les événements de scoring
  const scoringEvents = await Promise.all([
    prisma.scoringEvents.create({
      data: {
        artist_id: artists[0].id,
        event_type: 'profile_completion',
        score_change: 15,
        details: { reason: 'Profil complété à 100%' }
      }
    }),
    prisma.scoringEvents.create({
      data: {
        artist_id: artists[1].id,
        event_type: 'social_media_growth',
        score_change: 20,
        details: { reason: 'Croissance de 5000 followers' }
      }
    })
  ]);

  console.log('✅ Événements de scoring créés');

  console.log('🎉 Seed terminé avec succès !');
  console.log(`📊 Données créées :`);
  console.log(`- ${adminUsers.length} utilisateurs admin`);
  console.log(`- ${artists.length} artistes`);
  console.log(`- ${interactions.length} interactions`);
  console.log(`- ${opportunities.length} opportunités`);
  console.log(`- ${villas.length} villas SPARK`);
  console.log(`- ${applications.length} candidatures`);
  console.log(`- ${tasks.length} tâches`);
  console.log(`- ${events.length} événements`);
  console.log(`- ${workflows.length} workflows`);
  console.log(`- ${marketplaceBlocks.length} blocs marketplace`);
  console.log(`- ${communications.length} communications`);
  console.log(`- ${scoringEvents.length} événements de scoring`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 