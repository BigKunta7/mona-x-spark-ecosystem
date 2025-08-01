import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType?: 'artist' | 'investor' | 'team' | 'admin';
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string;
  category: string;
}

export default function DashboardLayout({ children, userType = 'artist' }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Navigation adaptée selon le type d'utilisateur
  const getNavigationItems = (): NavigationItem[] => {
    const baseItems: NavigationItem[] = [
      {
        id: 'overview',
        label: 'Vue d\'ensemble',
        href: '/dashboard',
        icon: '📊',
        category: 'main'
      }
    ];

    switch (userType) {
      case 'artist':
        return [
          ...baseItems,
          {
            id: 'score',
            label: 'Score MONA',
            href: '/dashboard/score',
            icon: '🎯',
            badge: '87',
            category: 'main'
          },
          {
            id: 'streaming',
            label: 'Streaming Analytics',
            href: '/dashboard/streaming',
            icon: '🎵',
            category: 'analytics'
          },
          {
            id: 'audience',
            label: 'Audience',
            href: '/dashboard/audience',
            icon: '👥',
            category: 'analytics'
          },
          {
            id: 'projects',
            label: 'Mes Projets',
            href: '/dashboard/projects',
            icon: '🎨',
            category: 'content'
          },
          {
            id: 'collaborations',
            label: 'Collaborations',
            href: '/dashboard/collaborations',
            icon: '🤝',
            category: 'content'
          },
          {
            id: 'finance',
            label: 'Finance',
            href: '/dashboard/finance',
            icon: '💰',
            category: 'business'
          },
          {
            id: 'spark',
            label: 'SPARK Events',
            href: '/dashboard/spark',
            icon: '✨',
            badge: 'New',
            category: 'business'
          }
        ];

      case 'investor':
        return [
          ...baseItems,
          {
            id: 'portfolio',
            label: 'Portfolio',
            href: '/dashboard/portfolio',
            icon: '📈',
            category: 'main'
          },
          {
            id: 'opportunities',
            label: 'Opportunités',
            href: '/dashboard/opportunities',
            icon: '💎',
            badge: '12',
            category: 'main'
          },
          {
            id: 'analytics',
            label: 'Analytics',
            href: '/dashboard/analytics',
            icon: '📊',
            category: 'analytics'
          },
          {
            id: 'artists',
            label: 'Artistes',
            href: '/dashboard/artists',
            icon: '🎤',
            category: 'content'
          }
        ];

      case 'team':
        return [
          ...baseItems,
          {
            id: 'artists-management',
            label: 'Gestion Artistes',
            href: '/dashboard/artists-management',
            icon: '🎤',
            category: 'main'
          },
          {
            id: 'campaigns',
            label: 'Campagnes',
            href: '/dashboard/campaigns',
            icon: '📢',
            category: 'main'
          },
          {
            id: 'events',
            label: 'Événements SPARK',
            href: '/dashboard/events',
            icon: '🎪',
            category: 'main'
          },
          {
            id: 'sponsors',
            label: 'Sponsors',
            href: '/dashboard/sponsors',
            icon: '🏢',
            category: 'business'
          },
          {
            id: 'team-management',
            label: 'Équipe',
            href: '/dashboard/team-management',
            icon: '👥',
            category: 'business'
          }
        ];

      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();
  const categories = [...new Set(navigationItems.map(item => item.category))];

  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case 'main': return 'Principal';
      case 'analytics': return 'Analytics';
      case 'content': return 'Contenu';
      case 'business': return 'Business';
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } bg-slate-800/50 backdrop-blur-xl border-r border-white/10`}>
        
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {!sidebarCollapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 mona-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MS</span>
              </div>
              <span className="font-bold text-white">MONA x SPARK</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span className="text-lg">{sidebarCollapsed ? '→' : '←'}</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6">
          {categories.map(category => (
            <div key={category}>
              {!sidebarCollapsed && (
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  {getCategoryLabel(category)}
                </h3>
              )}
              <div className="space-y-1">
                {navigationItems
                  .filter(item => item.category === category)
                  .map(item => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`nav-item ${pathname === item.href ? 'active' : ''}`}
                    >
                      <span className="text-lg mr-3">{item.icon}</span>
                      {!sidebarCollapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className="badge badge-info text-xs">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">John Doe</p>
                <p className="text-xs text-slate-400 truncate">
                  {userType === 'artist' ? 'Artiste' : 
                   userType === 'investor' ? 'Investisseur' : 
                   userType === 'team' ? 'Équipe' : 'Admin'}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-white">
                Dashboard
              </h1>
              <div className="flex items-center space-x-2">
                <span className="status-dot status-online"></span>
                <span className="text-sm text-slate-400">Tous les services opérationnels</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="form-input w-64 pl-10"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  🔍
                </span>
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
                <span className="text-lg">🔔</span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Settings */}
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <span className="text-lg">⚙️</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}