import express from 'express';

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'streaming-bridge', timestamp: new Date().toISOString() });
});

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: 'MONA x SPARK Streaming Bridge Service',
    version: '1.0.0',
    status: 'running'
  });
});

app.listen(PORT, () => {
  console.log(`🌊 Service Streaming Bridge démarré sur le port ${PORT}`);
}); 

export interface StreamEvent {
  id: string;
  type: 'creator_joined' | 'creator_left' | 'collaboration_started' | 'event_started' | 'score_updated';
  creator_id?: string;
  data: any;
  timestamp: Date;
}

export class StreamingBridgeService {
  private streams: Map<string, StreamEvent[]> = new Map();
  private subscribers: Map<string, Function[]> = new Map();

  async publishEvent(streamId: string, event: Omit<StreamEvent, 'id' | 'timestamp'>): Promise<StreamEvent> {
    const newEvent: StreamEvent = {
      ...event,
      id: this.generateId(),
      timestamp: new Date()
    };

    if (!this.streams.has(streamId)) {
      this.streams.set(streamId, []);
    }

    this.streams.get(streamId)!.push(newEvent);
    
    // Notifier les abonnés
    await this.notifySubscribers(streamId, newEvent);
    
    return newEvent;
  }

  async subscribeToStream(streamId: string, callback: Function): Promise<void> {
    if (!this.subscribers.has(streamId)) {
      this.subscribers.set(streamId, []);
    }

    this.subscribers.get(streamId)!.push(callback);
  }

  async unsubscribeFromStream(streamId: string, callback: Function): Promise<void> {
    const subscribers = this.subscribers.get(streamId);
    if (subscribers) {
      const index = subscribers.indexOf(callback);
      if (index > -1) {
        subscribers.splice(index, 1);
      }
    }
  }

  async getStreamEvents(streamId: string, limit: number = 50): Promise<StreamEvent[]> {
    const events = this.streams.get(streamId) || [];
    return events.slice(-limit);
  }

  private async notifySubscribers(streamId: string, event: StreamEvent): Promise<void> {
    const subscribers = this.subscribers.get(streamId) || [];
    
    for (const callback of subscribers) {
      try {
        await callback(event);
      } catch (error) {
        console.error(`Erreur lors de la notification d'un abonné:`, error);
      }
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

export default StreamingBridgeService; 