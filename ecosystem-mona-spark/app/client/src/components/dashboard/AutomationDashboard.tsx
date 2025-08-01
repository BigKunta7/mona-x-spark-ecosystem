import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface EmailSequence {
  id: string;
  name: string;
  category: 'SPARK-READY' | 'MONA-POSSIBLE' | 'EN-DEVELOPPEMENT' | 'NON-PRIORITAIRE';
  templates: EmailTemplate[];
  total_duration_days: number;
  conversion_goal: string;
  active: boolean;
  stats: {
    total_sent: number;
    open_rate: number;
    click_rate: number;
    conversion_rate: number;
  };
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  delay_days: number;
  active: boolean;
}

interface AutomationTrigger {
  id: string;
  name: string;
  type: string;
  conditions: any;
  actions: any[];
  active: boolean;
  last_triggered: string;
  trigger_count: number;
}

interface CreatorAutomation {
  creator_id: string;
  name: string;
  current_sequence: string;
  current_template: string;
  next_send_date: string;
  sequence_progress: number;
  engagement_score: number;
  last_interaction: string;
}

const COLORS = {
  'SPARK-READY': '#10B981',
  'MONA-POSSIBLE': '#3B82F6',
  'EN-DEVELOPPEMENT': '#F59E0B',
  'NON-PRIORITAIRE': '#EF4444'
};

export default function AutomationDashboard() {
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [triggers, setTriggers] = useState<AutomationTrigger[]>([]);
  const [creators, setCreators] = useState<CreatorAutomation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSequence, setSelectedSequence] = useState<string | null>(null);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  useEffect(() => {
    fetchAutomationData();
  }, []);

  const fetchAutomationData = async () => {
    try {
      // Simuler les données d'automatisation
      const mockSequences: EmailSequence[] = [
        {
          id: 'spark_ready_conversion',
          name: 'Conversion SPARK-READY',
          category: 'SPARK-READY',
          total_duration_days: 3,
          conversion_goal: 'Rendez-vous réservé',
          active: true,
          stats: {
            total_sent: 156,
            open_rate: 0.78,
            click_rate: 0.34,
            conversion_rate: 0.23
          },
          templates: [
            {
              id: 'spark_discovery',
              name: 'Découverte SPARK',
              subject: '🎪 [Nom] - Vous êtes SPARK-READY !',
              delay_days: 0,
              active: true
            },
            {
              id: 'spark_urgency',
              name: 'Urgence SPARK',
              subject: '⏰ [Nom] - Votre place SPARK expire dans 24h',
              delay_days: 1,
              active: true
            },
            {
              id: 'spark_relance',
              name: 'Relance SPARK',
              subject: '🤝 [Nom] - On a quelque chose de spécial pour vous',
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
          stats: {
            total_sent: 342,
            open_rate: 0.65,
            click_rate: 0.28,
            conversion_rate: 0.18
          },
          templates: [
            {
              id: 'mona_welcome',
              name: 'Bienvenue MONA',
              subject: '🎨 [Nom] - Bienvenue dans l\'écosystème MONA x SPARK',
              delay_days: 0,
              active: true
            },
            {
              id: 'mona_education',
              name: 'Éducation MONA',
              subject: '📚 [Nom] - Comment passer de MONA à SPARK',
              delay_days: 3,
              active: true
            },
            {
              id: 'mona_inspiration',
              name: 'Inspiration MONA',
              subject: '✨ [Nom] - Les secrets des créateurs SPARK',
              delay_days: 7,
              active: true
            },
            {
              id: 'mona_event',
              name: 'Événement MONA',
              subject: '🎪 [Nom] - Invitation exclusive événement SPARK',
              delay_days: 14,
              active: true
            },
            {
              id: 'mona_collaboration',
              name: 'Collaboration MONA',
              subject: '🤝 [Nom] - Opportunité de collaboration unique',
              delay_days: 21,
              active: true
            }
          ]
        }
      ];

      const mockTriggers: AutomationTrigger[] = [
        {
          id: 'scoring_upgrade',
          name: 'Upgrade de Scoring',
          type: 'scoring_upgrade',
          conditions: {
            old_category: ['EN-DEVELOPPEMENT', 'NON-PRIORITAIRE'],
            new_category: ['MONA-POSSIBLE', 'SPARK-READY']
          },
          actions: [
            { type: 'send_email', template_id: 'upgrade_congratulations' },
            { type: 'add_to_list', list_id: 'upgraded_creators' }
          ],
          active: true,
          last_triggered: '2024-01-15T14:30:00Z',
          trigger_count: 23
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
            { type: 'send_email', template_id: 'event_confirmation' },
            { type: 'send_notification', notification_type: 'event_reminder' }
          ],
          active: true,
          last_triggered: '2024-01-14T09:15:00Z',
          trigger_count: 45
        }
      ];

      const mockCreators: CreatorAutomation[] = [
        {
          creator_id: '1',
          name: 'Marie Dubois',
          current_sequence: 'spark_ready_conversion',
          current_template: 'spark_discovery',
          next_send_date: '2024-01-16T10:00:00Z',
          sequence_progress: 33,
          engagement_score: 0.85,
          last_interaction: '2024-01-15T14:30:00Z'
        },
        {
          creator_id: '2',
          name: 'Alex Martin',
          current_sequence: 'mona_possible_nurturing',
          current_template: 'mona_education',
          next_send_date: '2024-01-18T15:00:00Z',
          sequence_progress: 40,
          engagement_score: 0.72,
          last_interaction: '2024-01-15T11:20:00Z'
        }
      ];

      setSequences(mockSequences);
      setTriggers(mockTriggers);
      setCreators(mockCreators);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des données d\'automatisation:', error);
      setLoading(false);
    }
  };

  const toggleSequenceActive = (sequenceId: string) => {
    setSequences(prev => prev.map(seq => 
      seq.id === sequenceId ? { ...seq, active: !seq.active } : seq
    ));
  };

  const toggleTriggerActive = (triggerId: string) => {
    setTriggers(prev => prev.map(trigger => 
      trigger.id === triggerId ? { ...trigger, active: !trigger.active } : trigger
    ));
  };

  const toggleTemplateActive = (templateId: string) => {
    // Logique pour activer/désactiver un template
    console.log('Toggle template:', templateId);
  };

  const performanceData = sequences.map(seq => ({
    name: seq.name,
    open_rate: seq.stats.open_rate * 100,
    click_rate: seq.stats.click_rate * 100,
    conversion_rate: seq.stats.conversion_rate * 100
  }));

  const triggerData = triggers.map(trigger => ({
    name: trigger.name,
    count: trigger.trigger_count,
    last_triggered: new Date(trigger.last_triggered).toLocaleDateString()
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Système d'Automatisation</h1>
          <p className="text-gray-600">Gestion des séquences email et triggers</p>
        </div>
        <Button onClick={fetchAutomationData}>
          Actualiser
        </Button>
      </div>

      <Tabs defaultValue="sequences" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sequences">Séquences Email</TabsTrigger>
          <TabsTrigger value="triggers">Triggers</TabsTrigger>
          <TabsTrigger value="creators">Créateurs Actifs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="sequences" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Liste des séquences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Séquences Email</h3>
              {sequences.map((sequence) => (
                <Card key={sequence.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {sequence.name}
                          <Badge 
                            variant="secondary"
                            style={{ backgroundColor: COLORS[sequence.category] }}
                          >
                            {sequence.category}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          {sequence.templates.length} templates • {sequence.total_duration_days} jours
                        </p>
                      </div>
                      <Switch
                        checked={sequence.active}
                        onCheckedChange={() => toggleSequenceActive(sequence.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Envois</p>
                          <p className="text-gray-600">{sequence.stats.total_sent}</p>
                        </div>
                        <div>
                          <p className="font-medium">Taux d'ouverture</p>
                          <p className="text-gray-600">{(sequence.stats.open_rate * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="font-medium">Taux de clic</p>
                          <p className="text-gray-600">{(sequence.stats.click_rate * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="font-medium">Taux de conversion</p>
                          <p className="text-gray-600">{(sequence.stats.conversion_rate * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedSequence(sequence.id)}
                      >
                        Voir les templates
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Détails des templates */}
            {selectedSequence && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Templates</h3>
                {sequences
                  .find(s => s.id === selectedSequence)
                  ?.templates.map((template) => (
                    <Card key={template.id}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-sm">{template.name}</CardTitle>
                          <Switch 
                            checked={template.active} 
                            onCheckedChange={() => toggleTemplateActive(template.id)}
                          />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Sujet</p>
                          <p className="text-sm text-gray-600">{template.subject}</p>
                          <p className="text-sm text-gray-500">
                            Délai: {template.delay_days} jour(s)
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="triggers" className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Triggers d'Automatisation</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Dernière activation</TableHead>
                  <TableHead>Compteur</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {triggers.map((trigger) => (
                  <TableRow key={trigger.id}>
                    <TableCell className="font-medium">{trigger.name}</TableCell>
                    <TableCell>{trigger.type}</TableCell>
                    <TableCell>{new Date(trigger.last_triggered).toLocaleString()}</TableCell>
                    <TableCell>{trigger.trigger_count}</TableCell>
                    <TableCell>
                      <Switch
                        checked={trigger.active}
                        onCheckedChange={() => toggleTriggerActive(trigger.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Configurer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="creators" className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Créateurs en Séquences</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Créateur</TableHead>
                  <TableHead>Séquence</TableHead>
                  <TableHead>Progression</TableHead>
                  <TableHead>Prochain envoi</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creators.map((creator) => (
                  <TableRow key={creator.creator_id}>
                    <TableCell className="font-medium">{creator.name}</TableCell>
                    <TableCell>{creator.current_sequence}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={creator.sequence_progress} className="w-20" />
                        <span className="text-sm">{creator.sequence_progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(creator.next_send_date).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={creator.engagement_score * 100} className="w-20" />
                        <span className="text-sm">{(creator.engagement_score * 100).toFixed(0)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Pause
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance des séquences */}
            <Card>
              <CardHeader>
                <CardTitle>Performance des Séquences</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="open_rate" fill="#3B82F6" name="Taux d'ouverture" />
                    <Bar dataKey="click_rate" fill="#10B981" name="Taux de clic" />
                    <Bar dataKey="conversion_rate" fill="#F59E0B" name="Taux de conversion" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Activité des triggers */}
            <Card>
              <CardHeader>
                <CardTitle>Activité des Triggers</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={triggerData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Métriques globales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emails Envoyés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">
                  +12% ce mois
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux d'Ouverture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72.3%</div>
                <p className="text-xs text-muted-foreground">
                  +5% ce mois
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.7%</div>
                <p className="text-xs text-muted-foreground">
                  +3% ce mois
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Triggers Actifs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  Tous opérationnels
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog pour éditer un template */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Éditer le Template</DialogTitle>
            <DialogDescription>
              Modifiez le contenu et les paramètres du template email.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Sujet</Label>
              <Input id="subject" placeholder="Sujet de l'email" />
            </div>
            <div>
              <Label htmlFor="content">Contenu</Label>
              <Textarea 
                id="content" 
                placeholder="Contenu de l'email..."
                rows={10}
              />
            </div>
            <div>
              <Label htmlFor="delay">Délai (jours)</Label>
              <Input id="delay" type="number" placeholder="0" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
              Annuler
            </Button>
            <Button onClick={() => setShowTemplateDialog(false)}>
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 