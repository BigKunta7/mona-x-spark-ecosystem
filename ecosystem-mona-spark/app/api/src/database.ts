import { Pool } from 'pg';

// Configuration de la base de données
const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'mona_spark_db',
  user: process.env.POSTGRES_USER || 'mona_spark_user',
  password: process.env.POSTGRES_PASSWORD || 'mona_spark_password',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test de connexion
pool.on('connect', () => {
  console.log('✅ Connecté à PostgreSQL');
});

pool.on('error', (err: Error) => {
  console.error('❌ Erreur de connexion PostgreSQL:', err);
});

// Fonctions utilitaires pour la base de données
export const db = {
  // Requête simple
  query: (text: string, params?: any[]) => pool.query(text, params),
  
  // Requête avec transaction
  transaction: async (queries: { text: string; params?: any[] }[]) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const results = [];
      for (const query of queries) {
        const result = await client.query(query.text, query.params);
        results.push(result);
      }
      await client.query('COMMIT');
      return results;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  // Test de santé
  health: async () => {
    try {
      const result = await pool.query('SELECT NOW()');
      return { status: 'healthy', timestamp: result.rows[0].now };
    } catch (err: any) {
      return { status: 'unhealthy', error: err.message };
    }
  }
};

// Fonctions spécifiques MONA
export const monaDB = {
  // Créer un contact MONA
  createContact: async (contact: {
    name: string;
    email: string;
    service: string;
    message?: string;
  }) => {
    const query = `
      INSERT INTO mona_contacts (name, email, service, message, status, created_at)
      VALUES ($1, $2, $3, $4, 'pending', NOW())
      RETURNING *
    `;
    const result = await pool.query(query, [
      contact.name,
      contact.email,
      contact.service,
      contact.message || ''
    ]);
    return result.rows[0];
  },

  // Récupérer tous les contacts
  getContacts: async () => {
    const query = `
      SELECT * FROM mona_contacts 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  // Mettre à jour le statut d'un contact
  updateContactStatus: async (id: number, status: string) => {
    const query = `
      UPDATE mona_contacts 
      SET status = $2, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id, status]);
    return result.rows[0];
  }
};

// Fonctions spécifiques SPARK
export const sparkDB = {
  // Créer une réservation SPARK
  createBooking: async (booking: {
    name: string;
    email: string;
    edition: string;
    participants: number;
    dates?: string[];
    message?: string;
  }) => {
    const query = `
      INSERT INTO spark_bookings (name, email, edition, participants, dates, message, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, 'pending', NOW())
      RETURNING *
    `;
    const result = await pool.query(query, [
      booking.name,
      booking.email,
      booking.edition,
      booking.participants,
      booking.dates ? JSON.stringify(booking.dates) : null,
      booking.message || ''
    ]);
    return result.rows[0];
  },

  // Récupérer toutes les réservations
  getBookings: async () => {
    const query = `
      SELECT * FROM spark_bookings 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  // Mettre à jour le statut d'une réservation
  updateBookingStatus: async (id: number, status: string) => {
    const query = `
      UPDATE spark_bookings 
      SET status = $2, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id, status]);
    return result.rows[0];
  }
};

// Fonctions Analytics
export const analyticsDB = {
  // Récupérer les statistiques générales
  getStats: async () => {
    const contactsQuery = 'SELECT COUNT(*) as total FROM mona_contacts';
    const bookingsQuery = 'SELECT COUNT(*) as total FROM spark_bookings';
    const revenueQuery = `
      SELECT 
        SUM(CASE WHEN service = 'MONA 290' THEN 290
                  WHEN service = 'MONA 390' THEN 390
                  WHEN service = 'MONA 490+' THEN 490
                  ELSE 0 END) as mona_revenue
      FROM mona_contacts 
      WHERE status = 'confirmed'
    `;

    const [contactsResult, bookingsResult, revenueResult] = await Promise.all([
      pool.query(contactsQuery),
      pool.query(bookingsQuery),
      pool.query(revenueQuery)
    ]);

    return {
      totalContacts: parseInt(contactsResult.rows[0].total),
      totalBookings: parseInt(bookingsResult.rows[0].total),
      monaRevenue: parseInt(revenueResult.rows[0].mona_revenue || 0)
    };
  }
};

// =====================================================
// FONCTIONS POUR LA FINANCE CREATEUR
// =====================================================
export const financeDB = {
  createOffering: async (offering: {
    artistId: number;
    type: 'investment' | 'sovereignty';
    title: string;
    description?: string;
    revenueSharePercentage: number;
    fundingGoal: number;
    minInvestment: number;
    startDate: string;
    endDate: string;
    legalDocuments?: object;
  }) => {
    const query = `
      INSERT INTO offerings 
        (artist_id, type, title, description, revenue_share_percentage, funding_goal, min_investment, start_date, end_date, legal_documents, status)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'draft')
      RETURNING *
    `;
    const params = [
      offering.artistId,
      offering.type,
      offering.title,
      offering.description,
      offering.revenueSharePercentage,
      offering.fundingGoal,
      offering.minInvestment,
      offering.startDate,
      offering.endDate,
      offering.legalDocuments ? JSON.stringify(offering.legalDocuments) : null
    ];
    const result = await pool.query(query, params);
    return result.rows[0];
  },

  getActiveOfferings: async () => {
    const query = `
      SELECT 
        o.*, 
        a.artist_name, 
        a.genre, 
        a.social_media->>'instagram' as instagram_url
      FROM offerings o
      JOIN artists a ON o.artist_id = a.id
      WHERE o.status IN ('active', 'upcoming')
      ORDER BY o.end_date ASC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getOfferingById: async (id: number) => {
    const query = `
      SELECT 
        o.*, 
        a.artist_name, 
        a.genre,
        a.scoring_data,
        a.social_media
      FROM offerings o
      JOIN artists a ON o.artist_id = a.id
      WHERE o.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  createInvestment: async (investment: {
    offeringId: number;
    investorId: number;
    amountInvested: number;
    transactionId: string;
  }) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Insérer l'investissement
      const investmentQuery = `
        INSERT INTO investments (offering_id, investor_id, amount_invested, transaction_id, status)
        VALUES ($1, $2, $3, $4, 'confirmed')
        RETURNING *
      `;
      const investmentParams = [
        investment.offeringId,
        investment.investorId,
        investment.amountInvested,
        investment.transactionId
      ];
      const investmentResult = await client.query(investmentQuery, investmentParams);
      const newInvestment = investmentResult.rows[0];
      
      // 2. Mettre à jour le montant levé de l'offre
      const updateOfferingQuery = `
        UPDATE offerings
        SET amount_raised = amount_raised + $1
        WHERE id = $2
      `;
      await client.query(updateOfferingQuery, [investment.amountInvested, investment.offeringId]);

      await client.query('COMMIT');
      return newInvestment;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  getInvestmentsByUserId: async (userId: number) => {
    const query = `
      SELECT
        i.*,
        o.title as offering_title,
        o.revenue_share_percentage,
        a.artist_name
      FROM investments i
      JOIN offerings o ON i.offering_id = o.id
      JOIN artists a ON o.artist_id = a.id
      WHERE i.investor_id = $1
      ORDER BY i.created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  createPayoutPeriod: async (period: {
    offeringId: number;
    name: string;
    startDate: string;
    endDate: string;
    totalRevenuePool: number;
  }) => {
    const query = `
      INSERT INTO payout_periods (offering_id, name, start_date, end_date, total_revenue_pool, status)
      VALUES ($1, $2, $3, $4, $5, 'open')
      RETURNING *
    `;
    const params = [
      period.offeringId,
      period.name,
      period.startDate,
      period.endDate,
      period.totalRevenuePool
    ];
    const result = await pool.query(query, params);
    return result.rows[0];
  },

  claimPayout: async (claim: {
    investmentId: number;
    payoutPeriodId: number;
    investorId: number; // Pour la vérification de propriété
  }) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Vérifier l'investissement et récupérer les détails
      const invQuery = "SELECT * FROM investments WHERE id = $1 AND investor_id = $2 AND status = 'active'";
      const invResult = await client.query(invQuery, [claim.investmentId, claim.investorId]);
      if (invResult.rows.length === 0) {
        throw new Error('Investissement non trouvé, non valide ou déjà staké.');
      }
      const investment = invResult.rows[0];

      // 2. Vérifier la période de paiement
      const periodQuery = "SELECT * FROM payout_periods WHERE id = $1 AND status = 'open'";
      const periodResult = await client.query(periodQuery, [claim.payoutPeriodId]);
      if (periodResult.rows.length === 0) {
        throw new Error('Période de paiement non trouvée ou non ouverte.');
      }
      const period = periodResult.rows[0];

      // 3. Calculer le montant à payer (simplifié, une logique plus complexe serait nécessaire)
      // Ici, on suppose que revenue_share_owned est un % du total.
      // Par ex: si un investissement possède 1% (0.01) des parts, il touche 1% du pool.
      const amountClaimed = period.total_revenue_pool * (investment.revenue_share_owned / 100);

      // 4. Créer le payout
      const payoutQuery = `
        INSERT INTO payouts (investment_id, payout_period_id, amount_claimed, claim_date, transaction_id)
        VALUES ($1, $2, $3, NOW(), $4)
        RETURNING *
      `;
      const payoutParams = [claim.investmentId, claim.payoutPeriodId, amountClaimed, `txn_claim_${Date.now()}`];
      const payoutResult = await client.query(payoutQuery, payoutParams);

      // 5. Mettre à jour le statut de l'investissement
      const updateInvQuery = "UPDATE investments SET status = 'staked' WHERE id = $1";
      await client.query(updateInvQuery, [claim.investmentId]);

      await client.query('COMMIT');
      return payoutResult.rows[0];

    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
};

export default pool; 