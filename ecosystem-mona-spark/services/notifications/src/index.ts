import express from 'express';

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());

// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'notifications', timestamp: new Date().toISOString() });
});

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: 'MONA x SPARK Notifications Service',
    version: '1.0.0',
    status: 'running'
  });
});

app.listen(PORT, () => {
  console.log(`🔔 Service Notifications démarré sur le port ${PORT}`);
});

// Interface Notification définie localement
export interface Notification {
  id: string;
  user_id: string;
  type: 'email' | 'push' | 'sms';
  title: string;
  message: string;
  read: boolean;
  created_at: Date;
}

export class NotificationService {
  private notifications: Notification[] = [];

  async sendNotification(notification: Omit<Notification, 'id' | 'created_at'>): Promise<Notification> {
    const newNotification: Notification = {
      ...notification,
      id: this.generateId(),
      created_at: new Date()
    };

    this.notifications.push(newNotification);
    
    // Ici, intégration avec les services de notification (SendGrid, Twilio, etc.)
    await this.deliverNotification(newNotification);
    
    return newNotification;
  }

  async getNotifications(userId: string): Promise<Notification[]> {
    return this.notifications.filter(n => n.user_id === userId);
  }

  async markAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private async deliverNotification(notification: Notification): Promise<void> {
    switch (notification.type) {
      case 'email':
        await this.sendEmail(notification);
        break;
      case 'push':
        await this.sendPushNotification(notification);
        break;
      case 'sms':
        await this.sendSMS(notification);
        break;
    }
  }

  private async sendEmail(notification: Notification): Promise<void> {
    // Intégration avec SendGrid ou autre service email
    console.log(`📧 Email envoyé à ${notification.user_id}: ${notification.title}`);
  }

  private async sendPushNotification(notification: Notification): Promise<void> {
    // Intégration avec Firebase Cloud Messaging ou autre service push
    console.log(`🔔 Push notification envoyé à ${notification.user_id}: ${notification.title}`);
  }

  private async sendSMS(notification: Notification): Promise<void> {
    // Intégration avec Twilio ou autre service SMS
    console.log(`📱 SMS envoyé à ${notification.user_id}: ${notification.message}`);
  }
}

export default NotificationService; 