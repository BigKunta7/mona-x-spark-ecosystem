'use client';

import { useState, useEffect } from 'react';

interface DashboardStats {
  activeProjects: number;
  pendingContacts: number;
  upcomingEvents: number;
  monthlyRevenue: number;
  conversionRate: number;
  averageResponseTime: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  service: string;
  status: string;
  createdAt: string;
}

interface Booking {
  id: number;
  name: string;
  email: string;
  edition: string;
  participants: number;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'mona' | 'spark' | 'analytics'>('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setStats({
        activeProjects: 12,
        pendingContacts: 8,
        upcomingEvents: 3,
        monthlyRevenue: 45600,
        conversionRate: 14.7,
        averageResponseTime: '2.3h'
      });

      setContacts([
        {
          id: 1,
          name: 'Alex Martin',
          email: 'alex@example.com',
          service: 'MONA 390',
          status: 'pending',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          name: 'Sarah Chen',
          email: 'sarah@example.com',
          service: 'MONA 490+',
          status: 'contacted',
          createdAt: '2024-01-14T15:45:00Z'
        }
      ]);

      setBookings([
        {
          id: 1,
          name: 'Mike Johnson',
          email: 'mike@example.com',
          edition: 'SPARK Weekend',
          participants: 2,
          status: 'confirmed',
          createdAt: '2024-01-10T09:15:00Z'
        },
        {
          id: 2,
          name: 'Emma Davis',
          email: 'emma@example.com',
          edition: 'SPARK Week',
          participants: 1,
          status: 'pending',
          createdAt: '2024-01-12T14:20:00Z'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement du dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-white">
                Dashboard Admin
              </div>
              <div className="text-sm text-gray-300">
                MONA x SPARK
              </div>
            </div>
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'overview'
                    ? 'bg-white/20 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Vue d'ensemble
              </button>
              <button
                onClick={() => setActiveTab('mona')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'mona'
                    ? 'bg-white/20 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                MONA
              </button>
              <button
                onClick={() => setActiveTab('spark')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'spark'
                    ? 'bg-white/20 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                SPARK
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-white/20 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Analytics
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'overview' && <OverviewTab stats={stats!} />}
        {activeTab === 'mona' && <MonaTab contacts={contacts} />}
        {activeTab === 'spark' && <SparkTab bookings={bookings} />}
        {activeTab === 'analytics' && <AnalyticsTab />}
      </main>
    </div>
  );
}

function OverviewTab({ stats }: { stats: DashboardStats }) {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Vue d'ensemble</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <div className="text-3xl font-bold text-white">{stats.activeProjects}</div>
          <div className="text-gray-300">Projets actifs</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <div className="text-3xl font-bold text-white">{stats.pendingContacts}</div>
          <div className="text-gray-300">Contacts en attente</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <div className="text-3xl font-bold text-white">{stats.upcomingEvents}</div>
          <div className="text-gray-300">Événements à venir</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <div className="text-3xl font-bold text-white">{stats.monthlyRevenue.toLocaleString()}€</div>
          <div className="text-gray-300">Revenus mensuels</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Taux de conversion</span>
              <span className="text-white font-semibold">{stats.conversionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Temps de réponse moyen</span>
              <span className="text-white font-semibold">{stats.averageResponseTime}</span>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Actions rapides</h3>
          <div className="space-y-3">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
              Nouveau contact MONA
            </button>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              Nouvelle réservation SPARK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MonaTab({ contacts }: { contacts: Contact[] }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">Gestion MONA</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
          + Nouveau contact
        </button>
      </div>

      {/* Contacts Table */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-xl font-semibold text-white">Contacts récents</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {contact.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {contact.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      contact.status === 'pending' 
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-green-500/20 text-green-300'
                    }`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-purple-400 hover:text-purple-300 mr-3">
                      Voir
                    </button>
                    <button className="text-blue-400 hover:text-blue-300">
                      Contacter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SparkTab({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">Gestion SPARK</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
          + Nouvelle réservation
        </button>
      </div>

      {/* Bookings Table */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-xl font-semibold text-white">Réservations récentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Édition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {booking.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {booking.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {booking.edition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {booking.participants}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === 'pending' 
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-green-500/20 text-green-300'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-400 hover:text-blue-300 mr-3">
                      Voir
                    </button>
                    <button className="text-green-400 hover:text-green-300">
                      Confirmer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Revenus</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">MONA</span>
              <span className="text-white font-semibold">45,600€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">SPARK</span>
              <span className="text-white font-semibold">89,000€</span>
            </div>
            <div className="border-t border-white/10 pt-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Total</span>
                <span className="text-white font-semibold">134,600€</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Taux de conversion</span>
              <span className="text-white font-semibold">14.7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Croissance mensuelle</span>
              <span className="text-white font-semibold">+23.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Temps de réponse</span>
              <span className="text-white font-semibold">2.3h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 