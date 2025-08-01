'use client'

import { useState, useEffect } from 'react'

interface StreamConfig {
  platform: 'twitch' | 'youtube' | 'tiktok' | 'instagram'
  streamKey: string
  isLive: boolean
  viewers: number
  chatEnabled: boolean
}

interface OBSScene {
  id: string
  name: string
  isActive: boolean
  sources: OBSSource[]
}

interface OBSSource {
  id: string
  name: string
  type: 'camera' | 'screen' | 'image' | 'browser'
  isVisible: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
}

interface ChatMessage {
  id: string
  user: string
  message: string
  platform: string
  timestamp: Date
  isHighlighted: boolean
}

export default function StreamingStudioPage() {
  const [activeTab, setActiveTab] = useState('control')
  const [streamConfig, setStreamConfig] = useState<StreamConfig>({
    platform: 'twitch',
    streamKey: '',
    isLive: false,
    viewers: 0,
    chatEnabled: true
  })
  
  const [obsScenes, setObsScenes] = useState<OBSScene[]>([
    {
      id: 'main',
      name: 'Main Scene',
      isActive: true,
      sources: [
        {
          id: 'camera1',
          name: 'Camera Principale',
          type: 'camera',
          isVisible: true,
          position: { x: 0, y: 0 },
          size: { width: 1920, height: 1080 }
        },
        {
          id: 'camera2',
          name: 'Camera Secondaire',
          type: 'camera',
          isVisible: false,
          position: { x: 1600, y: 0 },
          size: { width: 320, height: 180 }
        },
        {
          id: 'screen',
          name: 'Capture Écran',
          type: 'screen',
          isVisible: false,
          position: { x: 0, y: 0 },
          size: { width: 1920, height: 1080 }
        }
      ]
    },
    {
      id: 'interview',
      name: 'Interview Mode',
      isActive: false,
      sources: [
        {
          id: 'camera1',
          name: 'Camera Interview',
          type: 'camera',
          isVisible: true,
          position: { x: 0, y: 0 },
          size: { width: 1920, height: 1080 }
        }
      ]
    }
  ])

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [selectedScene, setSelectedScene] = useState('main')
  const [isRecording, setIsRecording] = useState(false)
  const [streamDuration, setStreamDuration] = useState(0)

  // Simuler les données en temps réel
  useEffect(() => {
    if (streamConfig.isLive) {
      const interval = setInterval(() => {
        setStreamDuration(prev => prev + 1)
        setStreamConfig(prev => ({
          ...prev,
          viewers: prev.viewers + Math.floor(Math.random() * 10) - 5
        }))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [streamConfig.isLive])

  const startStream = () => {
    setStreamConfig(prev => ({ ...prev, isLive: true }))
    setStreamDuration(0)
  }

  const stopStream = () => {
    setStreamConfig(prev => ({ ...prev, isLive: false }))
    setIsRecording(false)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const switchScene = (sceneId: string) => {
    setObsScenes(prev => prev.map(scene => ({
      ...scene,
      isActive: scene.id === sceneId
    })))
    setSelectedScene(sceneId)
  }

  const toggleSource = (sceneId: string, sourceId: string) => {
    setObsScenes(prev => prev.map(scene => 
      scene.id === sceneId 
        ? {
            ...scene,
            sources: scene.sources.map(source =>
              source.id === sourceId
                ? { ...source, isVisible: !source.isVisible }
                : source
            )
          }
        : scene
    ))
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Studio Live V2</h1>
        <p className="text-gray-300">Contrôle total de votre streaming et lives</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-8">
        {[
          { id: 'control', label: 'Contrôle OBS', icon: '🎮' },
          { id: 'chat', label: 'Chat Multi-Platform', icon: '💬' },
          { id: 'analytics', label: 'Analytics Live', icon: '📊' },
          { id: 'schedule', label: 'Planification', icon: '📅' }
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

      {/* Contrôle OBS Tab */}
      {activeTab === 'control' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contrôles Principaux */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statut Stream */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Statut Stream</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  streamConfig.isLive 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {streamConfig.isLive ? 'EN DIRECT' : 'HORS LIGNE'}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {streamConfig.viewers.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Spectateurs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {formatDuration(streamDuration)}
                  </div>
                  <div className="text-sm text-gray-300">Durée</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {streamConfig.platform.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-300">Plateforme</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {isRecording ? '🔴' : '⚫'}
                  </div>
                  <div className="text-sm text-gray-300">Enregistrement</div>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={streamConfig.isLive ? stopStream : startStream}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    streamConfig.isLive
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {streamConfig.isLive ? 'Arrêter Stream' : 'Démarrer Stream'}
                </button>
                <button
                  onClick={toggleRecording}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {isRecording ? 'Arrêter Enregistrement' : 'Démarrer Enregistrement'}
                </button>
              </div>
            </div>

            {/* Scènes OBS */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Scènes OBS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {obsScenes.map(scene => (
                  <div
                    key={scene.id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      scene.isActive
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-gray-600 bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => switchScene(scene.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-white">{scene.name}</h4>
                        <p className="text-sm text-gray-300">
                          {scene.sources.filter(s => s.isVisible).length} sources actives
                        </p>
                      </div>
                      {scene.isActive && (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sources de la Scène Active */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Sources - {obsScenes.find(s => s.isActive)?.name}
              </h3>
              <div className="space-y-3">
                {obsScenes.find(s => s.isActive)?.sources.map(source => (
                  <div
                    key={source.id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        source.isVisible ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                      <div>
                        <div className="font-medium text-white">{source.name}</div>
                        <div className="text-sm text-gray-300 capitalize">{source.type}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSource(selectedScene, source.id)}
                      className="px-3 py-1 rounded text-sm bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      {source.isVisible ? 'Masquer' : 'Afficher'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panneau de Contrôle */}
          <div className="space-y-6">
            {/* Configuration Stream */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Plateforme
                  </label>
                  <select
                    value={streamConfig.platform}
                    onChange={(e) => setStreamConfig(prev => ({ ...prev, platform: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="twitch">Twitch</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Clé de Stream
                  </label>
                  <input
                    type="password"
                    value={streamConfig.streamKey}
                    onChange={(e) => setStreamConfig(prev => ({ ...prev, streamKey: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    placeholder="rtmp://..."
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="chatEnabled"
                    checked={streamConfig.chatEnabled}
                    onChange={(e) => setStreamConfig(prev => ({ ...prev, chatEnabled: e.target.checked }))}
                    className="w-4 h-4 text-purple-500"
                  />
                  <label htmlFor="chatEnabled" className="text-white">
                    Activer le chat
                  </label>
                </div>
              </div>
            </div>

            {/* Actions Rapides */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Actions Rapides</h3>
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  📸 Capture Screenshot
                </button>
                <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                  🎬 Démarrer Replay Buffer
                </button>
                <button className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors">
                  ⚡ Transition Rapide
                </button>
                <button className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                  🎵 Activer Musique
                </button>
              </div>
            </div>

            {/* Multicam Setup */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Setup Multicam</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white">Camera 1</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Camera 2</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Camera 3</span>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">GoPro</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Multi-Platform Tab */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 h-96">
              <h3 className="text-xl font-bold text-white mb-4">Chat Multi-Platform</h3>
              <div className="h-80 overflow-y-auto space-y-2">
                {chatMessages.map(message => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg ${
                      message.isHighlighted 
                        ? 'bg-yellow-500/20 border border-yellow-500/30' 
                        : 'bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-white">{message.user}</span>
                        <span className="text-xs text-gray-400">[{message.platform}]</span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-white mt-1">{message.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Plateformes</h3>
              <div className="space-y-3">
                {['Twitch', 'YouTube', 'TikTok', 'Instagram'].map(platform => (
                  <div key={platform} className="flex items-center justify-between">
                    <span className="text-white">{platform}</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Modération</h3>
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                  🚫 Bannir Utilisateur
                </button>
                <button className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors">
                  ⏰ Timeout Utilisateur
                </button>
                <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  📌 Épingler Message
                </button>
                <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                  ✅ Modérateur
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Live Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Engagement</h3>
            <div className="text-3xl font-bold text-white mb-2">87%</div>
            <div className="text-sm text-gray-300">Taux d'engagement moyen</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Messages Chat</h3>
            <div className="text-3xl font-bold text-white mb-2">1,234</div>
            <div className="text-sm text-gray-300">Messages cette session</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Nouveaux Followers</h3>
            <div className="text-3xl font-bold text-white mb-2">+45</div>
            <div className="text-sm text-gray-300">Followers gagnés</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Donations</h3>
            <div className="text-3xl font-bold text-white mb-2">€127</div>
            <div className="text-sm text-gray-300">Total donations</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Peak Viewers</h3>
            <div className="text-3xl font-bold text-white mb-2">2,847</div>
            <div className="text-sm text-gray-300">Spectateurs max</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Durée Moyenne</h3>
            <div className="text-3xl font-bold text-white mb-2">12m 34s</div>
            <div className="text-sm text-gray-300">Temps de visionnage</div>
          </div>
        </div>
      )}

      {/* Planification Tab */}
      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Calendrier des Lives</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">SPARK Villa - Session 1</h4>
                      <p className="text-sm text-gray-300">Aujourd'hui, 20:00 - 22:00</p>
                    </div>
                    <div className="text-sm text-green-400">En cours</div>
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">Interview Artistique</h4>
                      <p className="text-sm text-gray-300">Demain, 15:00 - 16:30</p>
                    </div>
                    <div className="text-sm text-blue-400">Programmé</div>
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">Behind the Scenes</h4>
                      <p className="text-sm text-gray-300">Vendredi, 18:00 - 19:00</p>
                    </div>
                    <div className="text-sm text-yellow-400">En préparation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Nouveau Live</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Titre du live"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                />
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                />
                <textarea
                  placeholder="Description"
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                ></textarea>
                <button className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                  Programmer Live
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 