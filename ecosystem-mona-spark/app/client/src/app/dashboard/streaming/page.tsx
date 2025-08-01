'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/ui/dashboard-layout';
import ChartContainer from '@/components/ui/chart-container';
import KPICard from '@/components/ui/kpi-card';
import PlatformComparison from '@/components/ui/platform-comparison';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function StreamingAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState<'streams' | 'followers' | 'engagement' | 'growth'>('streams');

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Données simulées pour les graphiques
  const streamingEvolution = [
    { date: '01/01', spotify: 45000, apple: 32000, youtube: 18000, soundcloud: 8000 },
    { date: '08/01', spotify: 52000, apple: 35000, youtube: 22000, soundcloud: 9000 },
    { date: '15/01', spotify: 48000, apple: 38000, youtube: 25000, soundcloud: 10000 },
    { date: '22/01', spotify: 58000, apple: 42000, youtube: 28000, soundcloud: 11000 },
    { date: '29/01', spotify: 65000, apple: 45000, youtube: 32000, soundcloud: 12000 }
  ];

  const topTracks = [
    { name: 'Midnight Dreams', streams: 450000, growth: 25.3, platform: 'Spotify' },
    { name: 'Electric Soul', streams: 320000, growth: 18.7, platform: 'Apple Music' },
    { name: 'Neon Lights', streams: 280000, growth: 15.2, platform: 'YouTube' },
    { name: 'Digital Love', streams: 195000, growth: 12.8, platform: 'SoundCloud' },
    { name: 'Cyber Dreams', streams: 165000, growth: 8.9, platform: 'Spotify' }
  ];

  const audienceData = [
    { name: '18-24', value: 35, color: '#8B5CF6' },
    { name: '25-34', value: 42, color: '#3B82F6' },
    { name: '35-44', value: 18, color: '#10B981' },
    { name: '45+', value: 5, color: '#F59E0B' }
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Streaming Analytics
            </h1>
            <p className="text-slate-400">
              Analyse détaillée de vos performances sur toutes les plateformes
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Period Selector */}
            <div className="flex items-center space-x-2">
              {['7d', '30d', '90d', '1y'].map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
            
            <button className="btn-secondary">
              📊 Exporter
            </button>
          </div>
        </div>

        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Streams Totaux"
            value={2650000}
            change={{ value: 18.5, period: "vs période précédente" }}
            icon="🎵"
            trend="up"
            color="mona"
            subtitle="Toutes plateformes"
            loading={loading}
          />
          <KPICard
            title="Streams Moyens/Jour"
            value={88333}
            change={{ value: 12.3, period: "vs période précédente" }}
            icon="📈"
            trend="up"
            color="spark"
            subtitle="Moyenne quotidienne"
            loading={loading}
          />
          <KPICard
            title="Top Track"
            value="450K"
            change={{ value: 25.3, period: "ce mois" }}
            icon="🏆"
            trend="up"
            color="success"
            subtitle="Midnight Dreams"
            loading={loading}
          />
          <KPICard
            title="Nouvelles Découvertes"
            value={12400}
            change={{ value: 8.9, period: "nouveaux auditeurs" }}
            icon="🔍"
            trend="up"
            color="warning"
            subtitle="Reach organique"
            loading={loading}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Streaming Evolution */}
          <ChartContainer
            title="Évolution des Streams"
            subtitle="Performance par plateforme sur 30 jours"
            loading={loading}
            actions={
              <button className="btn-secondary text-xs">
                Voir détails
              </button>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={streamingEvolution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="rgb(148, 163, 184)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="rgb(148, 163, 184)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(30, 41, 59, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="spotify" 
                  stroke="#1DB954" 
                  strokeWidth={3}
                  dot={{ fill: '#1DB954', strokeWidth: 2, r: 4 }}
                  name="Spotify"
                />
                <Line 
                  type="monotone" 
                  dataKey="apple" 
                  stroke="#FA243C" 
                  strokeWidth={3}
                  dot={{ fill: '#FA243C', strokeWidth: 2, r: 4 }}
                  name="Apple Music"
                />
                <Line 
                  type="monotone" 
                  dataKey="youtube" 
                  stroke="#FF0000" 
                  strokeWidth={3}
                  dot={{ fill: '#FF0000', strokeWidth: 2, r: 4 }}
                  name="YouTube"
                />
                <Line 
                  type="monotone" 
                  dataKey="soundcloud" 
                  stroke="#FF5500" 
                  strokeWidth={3}
                  dot={{ fill: '#FF5500', strokeWidth: 2, r: 4 }}
                  name="SoundCloud"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Audience Demographics */}
          <ChartContainer
            title="Démographie Audience"
            subtitle="Répartition par tranche d'âge"
            loading={loading}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={audienceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {audienceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(30, 41, 59, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Platform Comparison */}
        <PlatformComparison
          platforms={platformData}
          selectedMetric={selectedMetric}
          onMetricChange={setSelectedMetric}
        />

        {/* Top Tracks */}
        <ChartContainer
          title="Top Tracks"
          subtitle="Vos morceaux les plus performants"
          loading={loading}
        >
          <div className="space-y-4">
            {topTracks.map((track, index) => (
              <div key={track.name} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/8 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{track.name}</p>
                    <p className="text-sm text-slate-400">{track.platform}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="font-semibold text-white">
                      {(track.streams / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-slate-400">Streams</p>
                  </div>
                  
                  <div className="text-center">
                    <p className={`font-semibold ${track.growth >= 0 ? 'trending-up' : 'trending-down'}`}>
                      +{track.growth}%
                    </p>
                    <p className="text-xs text-slate-400">Croissance</p>
                  </div>
                  
                  <div className="w-24">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${(track.streams / Math.max(...topTracks.map(t => t.streams))) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>
    </DashboardLayout>
  );
}