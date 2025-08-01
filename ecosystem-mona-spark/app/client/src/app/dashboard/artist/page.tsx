'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/ui/dashboard-layout';
import KPICard from '@/components/ui/kpi-card';
import TalentScoreGauge from '@/components/ui/talent-score-gauge';
import StreamingMetrics from '@/components/ui/streaming-metrics';
import ChartContainer from '@/components/ui/chart-container';
import PlatformComparison from '@/components/ui/platform-comparison';


export default function ArtistDashboard() {
  const [mounted, setMounted] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'streams' | 'followers' | 'engagement' | 'growth'>('streams');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Simuler le chargement des données
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (!mounted) return null;

  // Données de streaming simulées
  const streamingMetrics = [
    {
      platform: 'Spotify',
      streams: 1200000,
      growth: 18.5,
      share: 45.2,
      icon: 'S',
      color: '#1DB954'
    },
    {
      platform: 'Apple Music',
      streams: 850000,
      growth: 12.3,
      share: 32.1,
      icon: 'A',
      color: '#FA243C'
    },
    {
      platform: 'YouTube Music',
      streams: 420000,
      growth: 25.7,
      share: 15.8,
      icon: 'Y',
      color: '#FF0000'
    },
    {
      platform: 'SoundCloud',
      streams: 180000,
      growth: 8.9,
      share: 6.9,
      icon: 'SC',
      color: '#FF5500'
    }
  ];

  const platformData = [
    {
      name: 'Spotify',
      icon: 'S',
      color: '#1DB954',
      metrics: {
        streams: 1200000,
        followers: 15400,
        engagement: 8.7,
        growth: 18.5
      }
    },
    {
      name: 'Apple Music',
      icon: 'A',
      color: '#FA243C',
      metrics: {
        streams: 850000,
        followers: 12100,
        engagement: 6.2,
        growth: 12.3
      }
    },
    {
      name: 'YouTube',
      icon: 'Y',
      color: '#FF0000',
      metrics: {
        streams: 420000,
        followers: 8900,
        engagement: 12.4,
        growth: 25.7
      }
    },
    {
      name: 'SoundCloud',
      icon: 'SC',
      color: '#FF5500',
      metrics: {
        streams: 180000,
        followers: 3200,
        engagement: 15.2,
        growth: 8.9
      }
    }
  ];
  return (
    <DashboardLayout userType="artist">
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Bonjour, Marie 👋
            </h1>
            <p className="text-slate-400">
              Voici un aperçu de vos performances musicales
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn-secondary">
              📊 Rapport Complet
            </button>
            <button className="btn-primary">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Streams Totaux"
            value={2650000}
            change={{ value: 18.5, period: "ce mois" }}
            icon="🎵"
            trend="up"
            color="mona"
            subtitle="Toutes plateformes"
            loading={loading}
          />
          <KPICard
            title="Followers"
            value={39700}
            change={{ value: 12.3, period: "ce mois" }}
            icon="👥"
            trend="up"
            color="spark"
            subtitle="Cross-platform"
            loading={loading}
          />
          <KPICard
            title="Engagement"
            value="9.2%"
            change={{ value: 2.1, period: "vs moyenne" }}
            icon="💫"
            trend="up"
            color="success"
            subtitle="Taux moyen"
            loading={loading}
          />
          <KPICard
            title="Revenus"
            value="€3,240"
            change={{ value: 15.7, period: "ce mois" }}
            icon="💰"
            trend="up"
            color="warning"
            subtitle="Revenue sharing"
            loading={loading}
          />
        </div>
              ➕ Nouveau Projet
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Score MONA */}
          <div className="lg:col-span-1">
            <div className="card-modern text-center">
              <h3 className="text-lg font-semibold text-white mb-6">
                Score MONA
              </h3>
              <TalentScoreGauge 
                score={87} 
                size="lg"
                showDetails={true}
              />
              
              {/* Score Breakdown */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Audience & Engagement</span>
                  <span className="text-sm font-semibold text-white">28/30</span>
                </div>
                <div className="progress-bar h-2">
                  <div className="progress-fill h-2" style={{ width: '93%' }} />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Croissance & Dynamisme</span>
                  <span className="text-sm font-semibold text-white">22/25</span>
                </div>
                <div className="progress-bar h-2">
                  <div className="progress-fill h-2" style={{ width: '88%' }} />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Qualité Créative</span>
                  <span className="text-sm font-semibold text-white">20/25</span>
                </div>
                <div className="progress-bar h-2">
                  <div className="progress-fill h-2" style={{ width: '80%' }} />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Potentiel Collaboratif</span>
                  <span className="text-sm font-semibold text-white">17/20</span>
                </div>
                <div className="progress-bar h-2">
                  <div className="progress-fill h-2" style={{ width: '85%' }} />
                </div>
              </div>
              
              <button className="btn-primary w-full mt-6">
                ✨ Candidater à SPARK
              </button>
            </div>
          </div>
            </button>
          {/* Streaming Analytics */}
          <div className="lg:col-span-2">
            <StreamingMetrics 
              metrics={streamingMetrics}
              totalStreams={2650000}
              period="30 derniers jours"
            />
          </div>
        </div>
          </div>
        {/* Platform Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PlatformComparison
            platforms={platformData}
            selectedMetric={selectedMetric}
            onMetricChange={setSelectedMetric}
          />
          
          {/* Recent Activity */}
          <ChartContainer
            title="Activité Récente"
            subtitle="Dernières actions et événements"
            loading={loading}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/8 transition-colors">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400">✅</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">Nouveau single publié</p>
                  <p className="text-sm text-slate-400">"Midnight Dreams" • il y a 2h</p>
                </div>
                <span className="text-xs text-slate-500">+1,240 streams</span>
              </div>
              
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/8 transition-colors">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400">📈</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">Score MONA mis à jour</p>
                  <p className="text-sm text-slate-400">+3 points • il y a 1j</p>
                </div>
                <span className="text-xs text-slate-500">87/120</span>
              </div>
              
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/8 transition-colors">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400">🤝</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">Nouvelle collaboration</p>
                  <p className="text-sm text-slate-400">Avec Alex Chen • il y a 3j</p>
                </div>
                <span className="text-xs text-slate-500">En cours</span>
              </div>
              
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/8 transition-colors">
                <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-amber-400">💰</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">Paiement reçu</p>
                  <p className="text-sm text-slate-400">Revenue sharing • il y a 5j</p>
                </div>
                <span className="text-xs text-slate-500">€450</span>
              </div>
            </div>
          </ChartContainer>
        </div>
        </div>
        {/* Quick Actions */}
        <div className="card-modern">
          <h3 className="text-lg font-semibold text-white mb-6">Actions Rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="interactive p-6 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 hover:border-indigo-500/40 text-left group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🎵</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Nouveau Single</h4>
                  <p className="text-sm text-slate-400">Publier une nouvelle track</p>
                </div>
              </div>
            </button>
            
            <button className="interactive p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:border-amber-500/40 text-left group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Analytics Détaillés</h4>
                  <p className="text-sm text-slate-400">Voir toutes les métriques</p>
                </div>
              </div>
            </button>
            
            <button className="interactive p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 hover:border-pink-500/40 text-left group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Événement SPARK</h4>
                  <p className="text-sm text-slate-400">Candidater aux villas</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 