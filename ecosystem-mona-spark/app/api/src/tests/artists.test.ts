import request from 'supertest';
import { app } from '../app';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

describe('Artists API', () => {
  let testUser: any;
  let testArtist: any;
  let authToken: string;

  beforeAll(async () => {
    // Créer un utilisateur de test
    const passwordHash = await bcrypt.hash('testpassword', 10);
    testUser = await prisma.users.create({
      data: {
        email: 'test@example.com',
        password_hash: passwordHash,
        first_name: 'Test',
        last_name: 'User',
        user_type: 'ADMIN'
      }
    });

    // Créer un artiste de test
    testArtist = await prisma.artists.create({
      data: {
        id: testUser.id,
        artist_name: 'Test Artist',
        genre: 'Pop',
        followers_count: 1000,
        score_mona: 75,
        market_fit_score: 80,
        level: 'prospect'
      }
    });

    // Générer un token d'authentification
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword'
      });

    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    // Nettoyer les données de test
    await prisma.artists.deleteMany({
      where: { artist_name: 'Test Artist' }
    });
    await prisma.users.deleteMany({
      where: { email: 'test@example.com' }
    });
    await prisma.$disconnect();
  });

  describe('GET /api/artists', () => {
    it('should return list of artists with pagination', async () => {
      const response = await request(app)
        .get('/api/artists')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('artists');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.artists)).toBe(true);
    });

    it('should filter artists by status', async () => {
      const response = await request(app)
        .get('/api/artists?status=qualified')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.artists).toBeDefined();
    });

    it('should filter artists by genre', async () => {
      const response = await request(app)
        .get('/api/artists?genre=Pop')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.artists).toBeDefined();
    });

    it('should search artists by name', async () => {
      const response = await request(app)
        .get('/api/artists?search=Test')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.artists).toBeDefined();
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/artists')
        .expect(401);
    });
  });

  describe('GET /api/artists/:id', () => {
    it('should return artist details', async () => {
      const response = await request(app)
        .get(`/api/artists/${testArtist.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('artist_name');
      expect(response.body.artist_name).toBe('Test Artist');
    });

    it('should return 404 for non-existent artist', async () => {
      await request(app)
        .get('/api/artists/non-existent-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });

  describe('POST /api/artists', () => {
    it('should create new artist', async () => {
      const artistData = {
        email: 'newartist@example.com',
        password: 'password123',
        firstName: 'New',
        lastName: 'Artist',
        artistName: 'New Test Artist',
        genre: 'Rock',
        phone: '+33 6 12 34 56 78'
      };

      const response = await request(app)
        .post('/api/artists')
        .set('Authorization', `Bearer ${authToken}`)
        .send(artistData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.artist_name).toBe('New Test Artist');
      expect(response.body.genre).toBe('Rock');

      // Nettoyer
      await prisma.artists.delete({
        where: { id: response.body.id }
      });
      await prisma.users.delete({
        where: { id: response.body.id }
      });
    });

    it('should validate required fields', async () => {
      const invalidData = {
        email: 'invalid-email',
        artistName: ''
      };

      const response = await request(app)
        .post('/api/artists')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/artists/:id', () => {
    it('should update artist', async () => {
      const updateData = {
        artist_name: 'Updated Test Artist',
        genre: 'Electronic',
        followers_count: 2000
      };

      const response = await request(app)
        .put(`/api/artists/${testArtist.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.artist_name).toBe('Updated Test Artist');
      expect(response.body.genre).toBe('Electronic');
      expect(response.body.followers_count).toBe(2000);
    });

    it('should return 404 for non-existent artist', async () => {
      await request(app)
        .put('/api/artists/non-existent-id')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ artist_name: 'Test' })
        .expect(404);
    });
  });

  describe('DELETE /api/artists/:id', () => {
    it('should delete artist', async () => {
      // Créer un artiste temporaire pour le test
      const tempUser = await prisma.users.create({
        data: {
          email: 'temp@example.com',
          password_hash: 'hash',
          first_name: 'Temp',
          last_name: 'User',
          user_type: 'ARTIST'
        }
      });

      const tempArtist = await prisma.artists.create({
        data: {
          id: tempUser.id,
          artist_name: 'Temp Artist',
          genre: 'Pop'
        }
      });

      await request(app)
        .delete(`/api/artists/${tempArtist.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Vérifier que l'artiste a été supprimé
      const deletedArtist = await prisma.artists.findUnique({
        where: { id: tempArtist.id }
      });
      expect(deletedArtist).toBeNull();
    });
  });

  describe('POST /api/artists/:id/interactions', () => {
    it('should add interaction to artist', async () => {
      const interactionData = {
        type: 'CALL',
        description: 'Appel de qualification',
        outcome: 'positive',
        nextAction: 'Suivre avec proposition',
        assignedTo: 'Marie'
      };

      const response = await request(app)
        .post(`/api/artists/${testArtist.id}/interactions`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(interactionData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.type).toBe('CALL');
      expect(response.body.description).toBe('Appel de qualification');
    });
  });

  describe('POST /api/artists/:id/opportunities', () => {
    it('should add opportunity to artist', async () => {
      const opportunityData = {
        title: 'Villa SPARK Session',
        value: 5000,
        probability: 80,
        stage: 'PROPOSAL',
        expectedClose: new Date('2024-02-15'),
        description: 'Participation à la villa SPARK'
      };

      const response = await request(app)
        .post(`/api/artists/${testArtist.id}/opportunities`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(opportunityData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Villa SPARK Session');
      expect(response.body.value).toBe(5000);
    });
  });

  describe('PUT /api/artists/:id/status', () => {
    it('should update artist status', async () => {
      const response = await request(app)
        .put(`/api/artists/${testArtist.id}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'qualified' })
        .expect(200);

      expect(response.body.level).toBe('qualified');
    });
  });

  describe('GET /api/artists/pipeline/stats', () => {
    it('should return pipeline statistics', async () => {
      const response = await request(app)
        .get('/api/artists/pipeline/stats')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('pipelineStats');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('averageScore');
      expect(response.body).toHaveProperty('conversionRate');
    });
  });
}); 