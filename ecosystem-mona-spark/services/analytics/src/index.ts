import { Analytics, Creator, Event } from '@mona-spark/shared';

export interface AnalyticsEvent {
  id: string;
  type: 'page_view' | 'button_click' | 'form_submit' | 'event_registration' | 'collaboration_start';
  user_id: string;
  data: any;
  timestamp: Date;
}

export class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private creators: Creator[] = [];
  private events_data: Event[] = [];

  async trackEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<AnalyticsEvent> {
    const newEvent: AnalyticsEvent = {
      ...event,
      id: this.generateId(),
      timestamp: new Date()
    };

    this.events.push(newEvent);
    
    // Ici, intégration avec Google Analytics, Mixpanel, etc.
    await this.sendToAnalyticsProvider(newEvent);
    
    return newEvent;
  }

  async getAnalytics(): Promise<Analytics> {
    const total_creators = this.creators.length;
    const total_events = this.events_data.length;
    const total_revenue = this.calculateTotalRevenue();
    const conversion_rate = this.calculateConversionRate();
    const average_score = this.calculateAverageScore();
    const monthly_growth = this.calculateMonthlyGrowth();

    return {
      total_creators,
      total_events,
      total_revenue,
      conversion_rate,
      average_score,
      monthly_growth
    };
  }

  async getEventsByType(type: string): Promise<AnalyticsEvent[]> {
    return this.events.filter(e => e.type === type);
  }

  async getEventsByUser(userId: string): Promise<AnalyticsEvent[]> {
    return this.events.filter(e => e.user_id === userId);
  }

  private calculateTotalRevenue(): number {
    // Calcul du revenu total basé sur les événements et collaborations
    return this.events_data.reduce((total, event) => total + event.price, 0);
  }

  private calculateConversionRate(): number {
    // Calcul du taux de conversion
    const total_visits = this.events.filter(e => e.type === 'page_view').length;
    const total_conversions = this.events.filter(e => e.type === 'event_registration').length;
    
    return total_visits > 0 ? (total_conversions / total_visits) * 100 : 0;
  }

  private calculateAverageScore(): number {
    if (this.creators.length === 0) return 0;
    
    const totalScore = this.creators.reduce((sum, creator) => sum + creator.score, 0);
    return totalScore / this.creators.length;
  }

  private calculateMonthlyGrowth(): number {
    // Calcul de la croissance mensuelle
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    
    const currentMonthEvents = this.events.filter(e => e.timestamp.getMonth() === currentMonth).length;
    const lastMonthEvents = this.events.filter(e => e.timestamp.getMonth() === lastMonth).length;
    
    return lastMonthEvents > 0 ? ((currentMonthEvents - lastMonthEvents) / lastMonthEvents) * 100 : 0;
  }

  private async sendToAnalyticsProvider(event: AnalyticsEvent): Promise<void> {
    // Intégration avec les fournisseurs d'analytics
    console.log(`📊 Événement analytics: ${event.type} par ${event.user_id}`);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

export default AnalyticsService; 