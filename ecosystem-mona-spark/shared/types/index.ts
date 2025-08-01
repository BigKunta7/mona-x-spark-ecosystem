// Types de base pour MONA x SPARK
export interface Analytics {
  id: string;
  type: string;
  data: any;
  timestamp: Date;
}

export interface Creator {
  id: string;
  name: string;
  type: string;
  followers: number;
}

export interface Event {
  id: string;
  name: string;
  type: string;
  timestamp: Date;
  data: any;
}

// Ré-export des types existants
export * from './marketplace';
export * from './spark-vision'; 