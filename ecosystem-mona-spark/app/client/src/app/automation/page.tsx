'use client'

import { useState, useEffect } from 'react'

interface AutomationWorkflow {
  id: string
  name: string
  description: string
  triggers: string[]
  actions: string[]
  status: 'active' | 'inactive' | 'draft'
  lastRun: Date
  nextRun: Date
  successRate: number
}

interface CalendarEvent {
  id: string
  title: string
  description: string
  start: Date
  end: Date
  type: 'meeting' | 'deadline' | 'reminder' | 'stream' | 'villa'
  color: string
  attendees: string[]
  location: string
}

interface KanbanTask {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee: string
  dueDate: Date
  tags: string[]
  estimatedHours: number
  actualHours: number
}

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState('workflows')
  const [selectedWorkflow, setSelectedWorkflow] = useState<AutomationWorkflow | null>(null)
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month')
  const [kanbanView, setKanbanView] = useState<'board' | 'list'>('board')

  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([
    {
      id: '1',
      name: 'Onboarding Artiste',
      description: 'Automatisation complète du processus d\'onboarding',
      triggers: ['Nouvel artiste inscrit', 'Profil complété'],
      actions: ['Envoi email de bienvenue', 'Création dossier', 'Assignation mentor'],
      status: 'active',
      lastRun: new Date('2024-01-20'),
      nextRun: new Date('2024-01-22'),
      successRate: 95
    },
    {
      id: '2',
      name: 'Suivi Villa SPARK',
      description: 'Automatisation du suivi des villas créatives',
      triggers: ['Réservation villa', 'Check-in artiste'],
      actions: ['Envoi kit préparation', 'Création planning', 'Notifications équipe'],
      status: 'active',
      lastRun: new Date('2024-01-19'),
      nextRun: new Date('2024-01-25'),
      successRate: 88
    },
    {
      id: '3',
      name: 'Analytics Reporting',
      description: 'Rapports automatiques de performance',
      triggers: ['Fin de semaine', 'Fin de mois'],
      actions: ['Génération rapport', 'Envoi équipe', 'Mise à jour dashboard'],
      status: 'active',
      lastRun: new Date('2024-01-21'),
      nextRun: new Date('2024-01-28'),
      successRate: 92
    }
  ])

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Réunion Équipe MONA',
      description: 'Review hebdomadaire des artistes et prospects',
      start: new Date('2024-01-22T10:00:00'),
      end: new Date('2024-01-22T11:30:00'),
      type: 'meeting',
      color: 'purple',
      attendees: ['Marie', 'Thomas', 'Sarah'],
      location: 'Bureau principal'
    },
    {
      id: '2',
      title: 'Villa SPARK - Session 1',
      description: 'Première session de la villa créative',
      start: new Date('2024-01-23T14:00:00'),
      end: new Date('2024-01-23T18:00:00'),
      type: 'villa',
      color: 'green',
      attendees: ['Alex Rivera', 'Sarah Chen', 'Équipe SPARK'],
      location: 'Villa créative'
    },
    {
      id: '3',
      title: 'Deadline - Contrat Alex',
      description: 'Finalisation du contrat exclusif',
      start: new Date('2024-01-24T17:00:00'),
      end: new Date('2024-01-24T17:00:00'),
      type: 'deadline',
      color: 'red',
      attendees: ['Thomas'],
      location: 'Bureau'
    }
  ])

  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>([
    {
      id: '1',
      title: 'Finaliser brief Alex Rivera',
      description: 'Préparer le brief complet pour la villa SPARK',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Marie',
      dueDate: new Date('2024-01-23'),
      tags: ['brief', 'villa'],
      estimatedHours: 4,
      actualHours: 2
    },
    {
      id: '2',
      title: 'Review contrat Sarah Chen',
      description: 'Réviser et négocier les termes du contrat',
      status: 'review',
      priority: 'urgent',
      assignee: 'Thomas',
      dueDate: new Date('2024-01-24'),
      tags: ['contrat', 'négociation'],
      estimatedHours: 6,
      actualHours: 4
    },
    {
      id: '3',
      title: 'Préparer présentation sponsors',
      description: 'Créer la présentation pour les nouveaux sponsors',
      status: 'todo',
      priority: 'medium',
      assignee: 'Sarah',
      dueDate: new Date('2024-01-26'),
      tags: ['présentation', 'sponsors'],
      estimatedHours: 3,
      actualHours: 0
    }
  ])

  const createWorkflow = () => {
    const newWorkflow: AutomationWorkflow = {
      id: Date.now().toString(),
      name: 'Nouveau Workflow',
      description: 'Description du workflow',
      triggers: [],
      actions: [],
      status: 'draft',
      lastRun: new Date(),
      nextRun: new Date(),
      successRate: 0
    }
    setWorkflows(prev => [...prev, newWorkflow])
    setSelectedWorkflow(newWorkflow)
  }

  const addCalendarEvent = () => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: 'Nouvel événement',
      description: 'Description de l\'événement',
      start: new Date(),
      end: new Date(),
      type: 'meeting',
      color: 'blue',
      attendees: [],
      location: ''
    }
    setCalendarEvents(prev => [...prev, newEvent])
  }

  const addKanbanTask = () => {
    const newTask: KanbanTask = {
      id: Date.now().toString(),
      title: 'Nouvelle tâche',
      description: 'Description de la tâche',
      status: 'todo',
      priority: 'medium',
      assignee: '',
      dueDate: new Date(),
      tags: [],
      estimatedHours: 0,
      actualHours: 0
    }
    setKanbanTasks(prev => [...prev, newTask])
  }

  const moveTask = (taskId: string, newStatus: KanbanTask['status']) => {
    setKanbanTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-500'
      case 'in-progress': return 'bg-blue-500'
      case 'review': return 'bg-yellow-500'
      case 'done': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-gray-400'
      case 'medium': return 'text-blue-400'
      case 'high': return 'text-orange-400'
      case 'urgent': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold text-white mb-6">
          Automation V2
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Automatisez votre carrière artistique avec nos outils intelligents 
          et nos workflows optimisés pour maximiser votre croissance.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-8">
        {[
          { id: 'workflows', label: 'Workflows Zapier/Make', icon: '⚡' },
          { id: 'calendar', label: 'Calendrier Google-like', icon: '📅' },
          { id: 'kanban', label: 'Kanban Trello-like', icon: '📋' },
          { id: 'analytics', label: 'Analytics Automation', icon: '📊' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Workflows Tab */}
      {activeTab === 'workflows' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Workflows Automatisés</h2>
            <button
              onClick={createWorkflow}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              + Nouveau Workflow
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map(workflow => (
              <div
                key={workflow.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/15 transition-all"
                onClick={() => setSelectedWorkflow(workflow)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{workflow.name}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    workflow.status === 'active' ? 'bg-green-500' :
                    workflow.status === 'inactive' ? 'bg-gray-500' : 'bg-yellow-500'
                  } text-white`}>
                    {workflow.status}
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 text-sm">{workflow.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="text-sm">
                    <span className="text-purple-400 font-semibold">Triggers:</span>
                    <div className="text-gray-300 mt-1">
                      {workflow.triggers.map(trigger => (
                        <div key={trigger} className="flex items-center">
                          <span className="text-green-400 mr-2">▶</span>
                          {trigger}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-blue-400 font-semibold">Actions:</span>
                    <div className="text-gray-300 mt-1">
                      {workflow.actions.map(action => (
                        <div key={action} className="flex items-center">
                          <span className="text-blue-400 mr-2">⚡</span>
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    Succès: {workflow.successRate}%
                  </span>
                  <span className="text-gray-400">
                    Prochaine exécution: {workflow.nextRun.toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Calendrier Google-like</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setCalendarView('month')}
                className={`px-3 py-1 rounded text-sm ${
                  calendarView === 'month' ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-300'
                }`}
              >
                Mois
              </button>
              <button
                onClick={() => setCalendarView('week')}
                className={`px-3 py-1 rounded text-sm ${
                  calendarView === 'week' ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-300'
                }`}
              >
                Semaine
              </button>
              <button
                onClick={() => setCalendarView('day')}
                className={`px-3 py-1 rounded text-sm ${
                  calendarView === 'day' ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-300'
                }`}
              >
                Jour
              </button>
              <button
                onClick={addCalendarEvent}
                className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded text-sm hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                + Événement
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                <div key={day} className="text-center text-gray-400 font-semibold py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }, (_, i) => (
                <div key={i} className="h-24 bg-white/5 rounded p-2 relative">
                  <span className="text-gray-400 text-sm">{i + 1}</span>
                  {calendarEvents.map(event => (
                    <div
                      key={event.id}
                      className={`absolute top-6 left-1 right-1 p-1 rounded text-xs text-white ${
                        event.color === 'purple' ? 'bg-purple-500' :
                        event.color === 'green' ? 'bg-green-500' :
                        event.color === 'red' ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Événements à venir</h3>
            <div className="space-y-3">
              {calendarEvents
                .sort((a, b) => a.start.getTime() - b.start.getTime())
                .slice(0, 5)
                .map(event => (
                  <div key={event.id} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      event.color === 'purple' ? 'bg-purple-500' :
                      event.color === 'green' ? 'bg-green-500' :
                      event.color === 'red' ? 'bg-red-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{event.title}</div>
                      <div className="text-sm text-gray-300">{event.description}</div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {event.start.toLocaleDateString()} {event.start.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Kanban Tab */}
      {activeTab === 'kanban' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Kanban Trello-like</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setKanbanView('board')}
                className={`px-3 py-1 rounded text-sm ${
                  kanbanView === 'board' ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-300'
                }`}
              >
                Board
              </button>
              <button
                onClick={() => setKanbanView('list')}
                className={`px-3 py-1 rounded text-sm ${
                  kanbanView === 'list' ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-300'
                }`}
              >
                Liste
              </button>
              <button
                onClick={addKanbanTask}
                className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded text-sm hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                + Tâche
              </button>
            </div>
          </div>

          {kanbanView === 'board' ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { status: 'todo', title: 'À faire', color: 'bg-gray-500' },
                { status: 'in-progress', title: 'En cours', color: 'bg-blue-500' },
                { status: 'review', title: 'En révision', color: 'bg-yellow-500' },
                { status: 'done', title: 'Terminé', color: 'bg-green-500' }
              ].map(column => (
                <div key={column.status} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{column.title}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${column.color} text-white`}>
                      {kanbanTasks.filter(task => task.status === column.status).length}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {kanbanTasks
                      .filter(task => task.status === column.status)
                      .map(task => (
                        <div
                          key={task.id}
                          className="bg-white/5 rounded-lg p-3 cursor-pointer hover:bg-white/10 transition-all"
                          draggable
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">{task.title}</h4>
                            <span className={`text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                              {task.priority.toUpperCase()}
                            </span>
                          </div>
                          
                          <p className="text-gray-300 text-sm mb-2">{task.description}</p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>Assigné à: {task.assignee}</span>
                            <span>{task.estimatedHours}h</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {task.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="space-y-3">
                {kanbanTasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
                      <div>
                        <div className="font-semibold text-white">{task.title}</div>
                        <div className="text-sm text-gray-300">{task.description}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className={`text-sm font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className="text-sm text-gray-400">{task.assignee}</span>
                      <span className="text-sm text-gray-400">
                        {task.dueDate.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Workflows Actifs</h3>
            <div className="text-3xl font-bold text-white mb-2">
              {workflows.filter(w => w.status === 'active').length}
            </div>
            <div className="text-sm text-gray-300">Workflows en cours d'exécution</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Taux de Succès</h3>
            <div className="text-3xl font-bold text-white mb-2">91%</div>
            <div className="text-sm text-gray-300">Moyenne des workflows</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Tâches Complétées</h3>
            <div className="text-3xl font-bold text-white mb-2">
              {kanbanTasks.filter(t => t.status === 'done').length}
            </div>
            <div className="text-sm text-gray-300">Cette semaine</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Événements Planifiés</h3>
            <div className="text-3xl font-bold text-white mb-2">
              {calendarEvents.filter(e => e.start > new Date()).length}
            </div>
            <div className="text-sm text-gray-300">Prochains événements</div>
          </div>
        </div>
      )}

      {/* Modal Workflow */}
      {selectedWorkflow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedWorkflow.name}</h2>
              <button
                onClick={() => setSelectedWorkflow(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-gray-300">{selectedWorkflow.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Triggers</h3>
                <div className="space-y-2">
                  {selectedWorkflow.triggers.map(trigger => (
                    <div key={trigger} className="flex items-center space-x-2">
                      <span className="text-green-400">▶</span>
                      <span className="text-white">{trigger}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Actions</h3>
                <div className="space-y-2">
                  {selectedWorkflow.actions.map(action => (
                    <div key={action} className="flex items-center space-x-2">
                      <span className="text-blue-400">⚡</span>
                      <span className="text-white">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Statistiques</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Taux de succès</span>
                      <span className="text-white">{selectedWorkflow.successRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Dernière exécution</span>
                      <span className="text-white">{selectedWorkflow.lastRun.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Prochaine exécution</span>
                      <span className="text-white">{selectedWorkflow.nextRun.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                      Activer/Désactiver
                    </button>
                    <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                      Modifier
                    </button>
                    <button className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 