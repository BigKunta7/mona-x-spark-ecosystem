// Types partagés pour MONA x SPARK

// =====================================================
// TYPES UTILISATEURS
// =====================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'admin' | 'manager' | 'coach' | 'strategist' | 'designer' | 'runner';

// =====================================================
// TYPES ARTISTES
// =====================================================

export interface Artist {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: ArtistStatus;
  monaScore: number;
  assignedTo?: string;
  socialProfiles: SocialProfile[];
  createdAt: Date;
  updatedAt: Date;
}

export type ArtistStatus = 'prospect' | 'qualified' | 'active' | 'completed' | 'archived';

export interface SocialProfile {
  platform: SocialPlatform;
  username: string;
  followers: number;
  engagement: number;
  url: string;
  lastUpdated: Date;
}

export type SocialPlatform = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook' | 'spotify' | 'soundcloud';

// =====================================================
// TYPES MONA (AGENCE & LABEL)
// =====================================================

export interface MonaCampaign {
  id: string;
  artistId: string;
  type: MonaCampaignType;
  status: CampaignStatus;
  title: string;
  description: string;
  budget: number;
  startDate: Date;
  endDate: Date;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}

export type MonaCampaignType = 'quick_win' | 'audit' | 'content_plan' | 'long_term';

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';

export interface DigitalCheckup {
  id: string;
  artistId: string;
  checkupDate: Date;
  socialScore: number;
  contentScore: number;
  engagementScore: number;
  recommendations: string[];
  createdAt: Date;
}

export interface StrategicPrescription {
  id: string;
  artistId: string;
  prescriptionDate: Date;
  diagnosis: string;
  strategy: string;
  actions: PrescriptionAction[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
}

export interface PrescriptionAction {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  assignedTo: string;
  status: 'pending' | 'in_progress' | 'completed';
}

// =====================================================
// TYPES SPARK (MEDIA LAB & STUDIO CRÉATIF)
// =====================================================

export interface SparkEvent {
  id: string;
  title: string;
  description: string;
  type: SparkEventType;
  status: EventStatus;
  startDate: Date;
  endDate: Date;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  budget: number;
  sponsors: Sponsor[];
  createdAt: Date;
  updatedAt: Date;
}

export type SparkEventType = 'villa_creative' | 'live_stream' | 'mini_docu' | 'showcase' | 'workshop';

export type EventStatus = 'planning' | 'registration' | 'active' | 'completed' | 'cancelled';

export interface SparkParticipant {
  id: string;
  eventId: string;
  artistId: string;
  role: ParticipantRole;
  status: ParticipantStatus;
  joinedAt: Date;
}

export type ParticipantRole = 'creator' | 'performer' | 'producer' | 'host' | 'guest';

export type ParticipantStatus = 'invited' | 'confirmed' | 'active' | 'completed';

export interface SparkContent {
  id: string;
  eventId: string;
  type: ContentType;
  title: string;
  description: string;
  url: string;
  duration: number;
  views: number;
  engagement: number;
  createdAt: Date;
}

export type ContentType = 'video' | 'image' | 'audio' | 'document' | 'stream';

// =====================================================
// TYPES SPONSORS
// =====================================================

export interface Sponsor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  industry: string;
  budget: number;
  interests: string[];
  status: SponsorStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type SponsorStatus = 'prospect' | 'qualified' | 'active' | 'inactive';

export interface SponsorshipOpportunity {
  id: string;
  sponsorId: string;
  eventId?: string;
  artistId?: string;
  type: SponsorshipType;
  value: number;
  description: string;
  status: OpportunityStatus;
  createdAt: Date;
}

export type SponsorshipType = 'event' | 'artist' | 'content' | 'platform';

export type OpportunityStatus = 'open' | 'negotiating' | 'closed' | 'lost';

// =====================================================
// TYPES CONTENUS
// =====================================================

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  url: string;
  size: number;
  mimeType: string;
  metadata: Record<string, any>;
  uploadedBy: string;
  createdAt: Date;
}

export type AssetType = 'image' | 'video' | 'audio' | 'document' | 'template';

export interface ContentTemplate {
  id: string;
  name: string;
  type: TemplateType;
  category: string;
  content: string;
  variables: string[];
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
}

export type TemplateType = 'social_post' | 'email' | 'presentation' | 'video_script';

export interface ContentSchedule {
  id: string;
  artistId: string;
  title: string;
  content: string;
  platform: SocialPlatform;
  scheduledDate: Date;
  status: ScheduleStatus;
  publishedAt?: Date;
  createdAt: Date;
}

export type ScheduleStatus = 'draft' | 'scheduled' | 'published' | 'failed';

// =====================================================
// TYPES TÂCHES & CALENDRIER
// =====================================================

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date;
  completedAt?: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed' | 'cancelled';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  type: EventType;
  startDate: Date;
  endDate: Date;
  location?: string;
  attendees: string[];
  isAllDay: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type EventType = 'meeting' | 'deadline' | 'event' | 'reminder';

// =====================================================
// TYPES MÉTRIQUES
// =====================================================

export interface ArtistMetrics {
  id: string;
  artistId: string;
  metricDate: Date;
  followers: number;
  engagement: number;
  reach: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  createdAt: Date;
}

export interface CampaignMetrics {
  id: string;
  campaignId: string;
  metricDate: Date;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  roi: number;
  createdAt: Date;
}

export interface EventMetrics {
  id: string;
  eventId: string;
  metricDate: Date;
  attendeesCount: number;
  viewsCount: number;
  engagementCount: number;
  revenueAmount: number;
  costAmount: number;
  profitAmount: number;
  createdAt: Date;
}

// =====================================================
// TYPES NOTIFICATIONS
// =====================================================

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

// =====================================================
// TYPES API RESPONSES
// =====================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  timestamp: Date;
}

// =====================================================
// TYPES CONFIGURATION
// =====================================================

export interface SystemConfig {
  key: string;
  value: string;
  description: string;
}

// =====================================================
// TYPES UTILITAIRES
// =====================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// =====================================================
// TYPES MONA BUSINESS MODEL
// =====================================================

export * from './mona-business-model';

// =====================================================
// TYPES SPARK VISION
// =====================================================

export * from './spark-vision';

// =====================================================
// TYPES MARKETPLACE
// =====================================================

export * from './marketplace'; 