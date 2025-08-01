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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

interface CreatorScore {
  creator_id: string;
  name: string;
  total_score: number;
  category: 'SPARK-READY' | 'MONA-POSSIBLE' | 'EN-DEVELOPPEMENT' | 'NON-PRIORITAIRE';
  confidence_level: number;
  breakdown: {
    audience_engagement: { total: number };
    growth_dynamism: { total: number };
    creative_quality: { total: number };
    collaborative_potential: { total: number };
  };
  recommendations: string[];
  last_updated: string;
}

interface ScoringStats {
  total_creators_analyzed: number;
  spark_ready_count: number;
  mona_possible_count: number;
  en_developpement_count: number;
  non_prioritaire_count: number;
  average_score: number;
  average_confidence: number;
  top_categories: Array<{ category: string; percentage: number }>;
}

const COLORS = {
  'SPARK-READY': '#10B981',
  'MONA-POSSIBLE': '#3B82F6',
  'EN-DEVELOPPEMENT': '#F59E0B',
  'NON-PRIORITAIRE': '#EF4444'
};

export default function ScoringDashboard() {
  const [scores, setScores] = useState<CreatorScore[]>([]);
  const [stats, setStats] = useState<ScoringStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchScoringData();
  }, []);

  const fetchScoringData = async () => {
    try {
      // Simuler les données de scoring
      const mockScores: CreatorScore[] = [
        {
          creator_id: '1',
          name: 'Marie Dubois',
          total_score: 85,
          category: 'SPARK-READY',
          confidence_level: 0.92,
          breakdown: {
            audience_engagement: { total: 28 },
            growth_dynamism: { total: 22 },
            creative_quality: { total: 20 },
            collaborative_potential: { total: 15 }
          },
          recommendations: [
            'Prêt pour les événements SPARK - contactez-nous immédiatement',
            'Opportunité de collaboration premium disponible'
          ],
          last_updated: '2024-01-15T10:30:00Z'
        },
        {
          creator_id: '2',
          name: 'Alex Martin',
          total_score: 72,
          category: 'MONA-POSSIBLE',
          confidence_level: 0.85,
          breakdown: {
            audience_engagement: { total: 25 },
            growth_dynamism: { total: 18 },
            creative_quality: { total: 16 },
            collaborative_potential: { total: 13 }
          },
          recommendations: [
            'Potentiel SPARK identifié - participez à nos événements gratuits',
            'Accédez à notre programme de mentorat'
          ],
          last_updated: '2024-01-14T15:45:00Z'
        },
        {
          creator_id: '3',
          name: 'Sophie Chen',
          total_score: 58,
          category: 'EN-DEVELOPPEMENT',
          confidence_level: 0.78,
          breakdown: {
            audience_engagement: { total: 20 },
            growth_dynamism: { total: 15 },
            creative_quality: { total: 14 },
            collaborative_potential: { total: 9 }
          },
          recommendations: [
            'Rejoignez notre programme d\'accompagnement créateur',
            'Participez à nos workshops gratuits'
          ],
          last_updated: '2024-01-13T09:20:00Z'
        }
      ];

      const mockStats: ScoringStats = {
        total_creators_analyzed: 1250,
        spark_ready_count: 156,
        mona_possible_count: 342,
        en_developpement_count: 489,
        non_prioritaire_count: 263,
        average_score: 58.7,
        average_confidence: 0.82,
        top_categories: [
          { category: 'SPARK-READY', percentage: 12.5 },
          { category: 'MONA-POSSIBLE', percentage: 27.4 },
          { category: 'EN-DEVELOPPEMENT', percentage: 39.1 },
          { category: 'NON-PRIORITAIRE', percentage: 21.0 }
        ]
      };

      setScores(mockScores);
      setStats(mockStats);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des données de scoring:', error);
      setLoading(false);
    }
  };

  const filteredScores = selectedCategory === 'all' 
    ? scores 
    : scores.filter(score => score.category === selectedCategory);

  const categoryData = stats?.top_categories.map(cat => ({
    name: cat.category,
    value: cat.percentage,
    color: COLORS[cat.category as keyof typeof COLORS]
  })) || [];

  const scoreDistribution = [
    { name: '80-100', value: stats?.spark_ready_count || 0, color: COLORS['SPARK-READY'] },
    { name: '60-79', value: stats?.mona_possible_count || 0, color: COLORS['MONA-POSSIBLE'] },
    { name: '40-59', value: stats?.en_developpement_count || 0, color: COLORS['EN-DEVELOPPEMENT'] },
    { name: '0-39', value: stats?.non_prioritaire_count || 0, color: COLORS['NON-PRIORITAIRE'] }
  ];

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
          <h1 className="text-3xl font-bold">Système de Scoring</h1>
          <p className="text-gray-600">Analyse et gestion des créateurs</p>
        </div>
        <Button onClick={fetchScoringData}>
          Actualiser
        </Button>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Analysés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_creators_analyzed}</div>
            <p className="text-xs text-muted-foreground">
              Créateurs évalués
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.average_score.toFixed(1)}/100</div>
            <p className="text-xs text-muted-foreground">
              Performance globale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confiance Moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats?.average_confidence || 0) * 100}%</div>
            <p className="text-xs text-muted-foreground">
              Qualité des évaluations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SPARK-READY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.spark_ready_count}</div>
            <p className="text-xs text-muted-foreground">
              Prêts pour les événements
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="creators">Créateurs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Distribution des catégories */}
            <Card>
              <CardHeader>
                <CardTitle>Distribution par Catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribution des scores */}
            <Card>
              <CardHeader>
                <CardTitle>Distribution des Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={scoreDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8">
                      {scoreDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="creators" className="space-y-4">
          {/* Filtres */}
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
            >
              Tous
            </Button>
            <Button
              variant={selectedCategory === 'SPARK-READY' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('SPARK-READY')}
            >
              SPARK-READY
            </Button>
            <Button
              variant={selectedCategory === 'MONA-POSSIBLE' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('MONA-POSSIBLE')}
            >
              MONA-POSSIBLE
            </Button>
            <Button
              variant={selectedCategory === 'EN-DEVELOPPEMENT' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('EN-DEVELOPPEMENT')}
            >
              EN-DEVELOPPEMENT
            </Button>
          </div>

          {/* Liste des créateurs */}
          <div className="space-y-4">
            {filteredScores.map((score) => (
              <Card key={score.creator_id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {score.name}
                        <Badge 
                          variant="secondary"
                          style={{ backgroundColor: COLORS[score.category] }}
                        >
                          {score.category}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        Score: {score.total_score}/100 | Confiance: {(score.confidence_level * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      Mis à jour: {new Date(score.last_updated).toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Breakdown du score */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-medium">Audience & Engagement</p>
                        <Progress value={(score.breakdown.audience_engagement.total / 30) * 100} className="mt-1" />
                        <p className="text-xs text-gray-600">{score.breakdown.audience_engagement.total}/30</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Croissance & Dynamisme</p>
                        <Progress value={(score.breakdown.growth_dynamism.total / 25) * 100} className="mt-1" />
                        <p className="text-xs text-gray-600">{score.breakdown.growth_dynamism.total}/25</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Qualité Créative</p>
                        <Progress value={(score.breakdown.creative_quality.total / 25) * 100} className="mt-1" />
                        <p className="text-xs text-gray-600">{score.breakdown.creative_quality.total}/25</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Potentiel Collaboratif</p>
                        <Progress value={(score.breakdown.collaborative_potential.total / 20) * 100} className="mt-1" />
                        <p className="text-xs text-gray-600">{score.breakdown.collaborative_potential.total}/20</p>
                      </div>
                    </div>

                    {/* Recommandations */}
                    <div>
                      <p className="text-sm font-medium mb-2">Recommandations :</p>
                      <ul className="space-y-1">
                        {score.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Évolution des scores */}
            <Card>
              <CardHeader>
                <CardTitle>Évolution des Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { month: 'Jan', spark: 12, mona: 28, dev: 40, non: 20 },
                    { month: 'Fév', spark: 15, mona: 30, dev: 38, non: 17 },
                    { month: 'Mar', spark: 18, mona: 32, dev: 35, non: 15 },
                    { month: 'Avr', spark: 20, mona: 35, dev: 32, non: 13 },
                    { month: 'Mai', spark: 22, mona: 38, dev: 30, non: 10 },
                    { month: 'Jun', spark: 25, mona: 40, dev: 28, non: 7 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="spark" stroke={COLORS['SPARK-READY']} name="SPARK-READY" />
                    <Line type="monotone" dataKey="mona" stroke={COLORS['MONA-POSSIBLE']} name="MONA-POSSIBLE" />
                    <Line type="monotone" dataKey="dev" stroke={COLORS['EN-DEVELOPPEMENT']} name="EN-DEVELOPPEMENT" />
                    <Line type="monotone" dataKey="non" stroke={COLORS['NON-PRIORITAIRE']} name="NON-PRIORITAIRE" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Métriques de performance */}
            <Card>
              <CardHeader>
                <CardTitle>Métriques de Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Taux de Conversion</p>
                    <div className="flex items-center gap-2">
                      <Progress value={23} className="flex-1" />
                      <span className="text-sm font-medium">23%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Temps de Réponse Moyen</p>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="flex-1" />
                      <span className="text-sm font-medium">2.3h</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Satisfaction Client</p>
                    <div className="flex items-center gap-2">
                      <Progress value={92} className="flex-1" />
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Taux de Rétention</p>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="flex-1" />
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 