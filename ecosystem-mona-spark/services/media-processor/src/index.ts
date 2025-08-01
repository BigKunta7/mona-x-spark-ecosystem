import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

// Route de santé
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', service: 'media-processor', timestamp: new Date().toISOString() });
});

// Route racine
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'MONA x SPARK Media Processor Service',
    version: '1.0.0',
    status: 'running'
  });
});

app.listen(PORT, () => {
  console.log(`🖼️ Service Media Processor démarré sur le port ${PORT}`);
});

// Interface Creator définie localement
export interface Creator {
  id: string;
  name: string;
  email: string;
  genre?: string;
  location?: string;
}

export interface MediaFile {
  id: string;
  creator_id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  filename: string;
  size: number;
  duration?: number;
  processed: boolean;
  created_at: Date;
}

export class MediaProcessorService {
  private mediaFiles: MediaFile[] = [];

  async processMedia(file: Omit<MediaFile, 'id' | 'processed' | 'created_at'>): Promise<MediaFile> {
    const newFile: MediaFile = {
      ...file,
      id: this.generateId(),
      processed: false,
      created_at: new Date()
    };

    this.mediaFiles.push(newFile);
    
    // Traitement du média selon son type
    await this.processFile(newFile);
    
    return newFile;
  }

  async getMediaByCreator(creatorId: string): Promise<MediaFile[]> {
    return this.mediaFiles.filter(f => f.creator_id === creatorId);
  }

  async getProcessedMedia(): Promise<MediaFile[]> {
    return this.mediaFiles.filter(f => f.processed);
  }

  private async processFile(file: MediaFile): Promise<void> {
    switch (file.type) {
      case 'image':
        await this.processImage(file);
        break;
      case 'video':
        await this.processVideo(file);
        break;
      case 'audio':
        await this.processAudio(file);
        break;
    }
  }

  private async processImage(file: MediaFile): Promise<void> {
    // Optimisation d'image (redimensionnement, compression, etc.)
    console.log(`🖼️ Traitement image: ${file.filename}`);
    
    // Simulation du traitement
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    file.processed = true;
  }

  private async processVideo(file: MediaFile): Promise<void> {
    // Traitement vidéo (compression, format conversion, etc.)
    console.log(`🎥 Traitement vidéo: ${file.filename}`);
    
    // Simulation du traitement
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    file.processed = true;
  }

  private async processAudio(file: MediaFile): Promise<void> {
    // Traitement audio (compression, format conversion, etc.)
    console.log(`🎵 Traitement audio: ${file.filename}`);
    
    // Simulation du traitement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    file.processed = true;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

export default MediaProcessorService; 