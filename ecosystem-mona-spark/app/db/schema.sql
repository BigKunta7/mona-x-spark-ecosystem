-- =====================================================
-- MONA x SPARK - Schéma de Base de Données
-- =====================================================

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLES PRINCIPALES
-- =====================================================

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'user',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des artistes
CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    user_id INTEGER REFERENCES users(id),
    artist_name VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    followers_count INTEGER DEFAULT 0,
    social_media JSONB,
    scoring_data JSONB,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des campagnes MONA
CREATE TABLE IF NOT EXISTS mona_campaigns (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    artist_id INTEGER REFERENCES artists(id),
    campaign_type VARCHAR(50) NOT NULL, -- '290', '390', '490+'
    status VARCHAR(50) DEFAULT 'pending',
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10,2),
    results JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des contacts MONA
CREATE TABLE IF NOT EXISTS mona_contacts (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service VARCHAR(100) NOT NULL, -- 'MONA 290', 'MONA 390', 'MONA 490+'
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'contacted', 'confirmed', 'rejected'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des événements SPARK
CREATE TABLE IF NOT EXISTS spark_events (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    event_name VARCHAR(255) NOT NULL,
    edition_type VARCHAR(50) NOT NULL, -- 'weekend', 'week', 'month'
    location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    price DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des réservations SPARK
CREATE TABLE IF NOT EXISTS spark_bookings (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    edition VARCHAR(100) NOT NULL, -- 'SPARK Weekend', 'SPARK Week', 'SPARK Month'
    participants INTEGER DEFAULT 1,
    dates JSONB, -- Array de dates
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des sponsors
CREATE TABLE IF NOT EXISTS sponsors (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    budget_range VARCHAR(100),
    interests JSONB,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des assets
CREATE TABLE IF NOT EXISTS assets (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'image', 'video', 'document', 'audio'
    url VARCHAR(500),
    file_path VARCHAR(500),
    file_size BIGINT,
    mime_type VARCHAR(100),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des tâches
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_to INTEGER REFERENCES users(id),
    related_entity_type VARCHAR(50), -- 'artist', 'campaign', 'event'
    related_entity_id INTEGER,
    priority VARCHAR(20) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'pending',
    due_date TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des notifications
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    data JSONB,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLES POUR LA FINANCE CREATEUR (CREATOR FINANCE)
-- =====================================================

-- Table des offres d'investissement (drops)
CREATE TABLE IF NOT EXISTS offerings (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    artist_id INTEGER REFERENCES artists(id) NOT NULL,
    type VARCHAR(50) DEFAULT 'investment' NOT NULL, -- 'investment', 'sovereignty'
    title VARCHAR(255) NOT NULL,
    description TEXT,
    revenue_share_percentage DECIMAL(5, 2) NOT NULL, -- Ex: 5.00 pour 5%
    funding_goal DECIMAL(12, 2) NOT NULL,
    amount_raised DECIMAL(12, 2) DEFAULT 0.00,
    min_investment DECIMAL(10, 2) DEFAULT 25.00,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'draft' NOT NULL, -- 'draft', 'pending_approval', 'upcoming', 'active', 'successful', 'failed', 'completed'
    legal_documents JSONB, -- { prospectusUrl: '...', risksUrl: '...', etc. }
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des investissements
CREATE TABLE IF NOT EXISTS investments (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    offering_id INTEGER REFERENCES offerings(id) NOT NULL,
    investor_id INTEGER REFERENCES users(id) NOT NULL,
    amount_invested DECIMAL(10, 2) NOT NULL,
    revenue_share_owned DECIMAL(8, 5), -- Calculé après la clôture de l'offre
    transaction_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active' NOT NULL, -- 'active', 'staked', 'sold'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des périodes de distribution
CREATE TABLE IF NOT EXISTS payout_periods (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    offering_id INTEGER REFERENCES offerings(id) NOT NULL,
    name VARCHAR(255) NOT NULL, -- Ex: "Revenus Juillet 2025"
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_revenue_pool DECIMAL(12, 2) NOT NULL, -- Montant total à distribuer pour cette période
    status VARCHAR(50) DEFAULT 'open' NOT NULL, -- 'open', 'closed', 'processing'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des distributions de revenus (claims)
CREATE TABLE IF NOT EXISTS payouts (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4(),
    investment_id INTEGER REFERENCES investments(id) NOT NULL,
    payout_period_id INTEGER REFERENCES payout_periods(id) NOT NULL,
    amount_claimed DECIMAL(10, 2) NOT NULL,
    claim_date DATE NOT NULL,
    transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(investment_id, payout_period_id) -- Un investisseur ne peut réclamer qu'une fois par période
);

-- =====================================================
-- TABLES DE MÉTRIQUES
-- =====================================================

-- Métriques artistes
CREATE TABLE IF NOT EXISTS artist_metrics (
    id SERIAL PRIMARY KEY,
    artist_id INTEGER REFERENCES artists(id),
    metric_type VARCHAR(50) NOT NULL,
    metric_value DECIMAL(10,2),
    metric_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Métriques campagnes
CREATE TABLE IF NOT EXISTS campaign_metrics (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES mona_campaigns(id),
    metric_type VARCHAR(50) NOT NULL,
    metric_value DECIMAL(10,2),
    metric_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Métriques événements
CREATE TABLE IF NOT EXISTS event_metrics (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES spark_events(id),
    metric_type VARCHAR(50) NOT NULL,
    metric_value DECIMAL(10,2),
    metric_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEX POUR LES PERFORMANCES
-- =====================================================

-- Index sur les emails
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_mona_contacts_email ON mona_contacts(email);
CREATE INDEX IF NOT EXISTS idx_spark_bookings_email ON spark_bookings(email);

-- Index sur les statuts
CREATE INDEX IF NOT EXISTS idx_mona_contacts_status ON mona_contacts(status);
CREATE INDEX IF NOT EXISTS idx_spark_bookings_status ON spark_bookings(status);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_offerings_status ON offerings(status);
CREATE INDEX IF NOT EXISTS idx_investments_status ON investments(status);

-- Index sur les dates
CREATE INDEX IF NOT EXISTS idx_mona_contacts_created_at ON mona_contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_spark_bookings_created_at ON spark_bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_offerings_end_date ON offerings(end_date);
CREATE INDEX IF NOT EXISTS idx_payouts_payout_date ON payouts(payout_date);


-- Index sur les métriques
CREATE INDEX IF NOT EXISTS idx_artist_metrics_date ON artist_metrics(metric_date);
CREATE INDEX IF NOT EXISTS idx_campaign_metrics_date ON campaign_metrics(metric_date);
CREATE INDEX IF NOT EXISTS idx_event_metrics_date ON event_metrics(metric_date);

-- Index pour Creator Finance
CREATE INDEX IF NOT EXISTS idx_offerings_artist_id ON offerings(artist_id);
CREATE INDEX IF NOT EXISTS idx_investments_offering_id ON investments(offering_id);
CREATE INDEX IF NOT EXISTS idx_investments_investor_id ON investments(investor_id);
CREATE INDEX IF NOT EXISTS idx_payouts_investment_id ON payouts(investment_id);


-- =====================================================
-- DONNÉES DE TEST (COMMENTÉES POUR ENVIRONNEMENT PRODUCTION)
-- =====================================================

/*
-- Utilisateur admin par défaut
INSERT INTO users (email, password_hash, first_name, last_name, role) 
VALUES ('admin@mona-spark.com', '$2b$10$example_hash', 'Admin', 'MONA x SPARK', 'admin');

-- Artiste de test
INSERT INTO artists (user_id, artist_name, genre, followers_count) 
VALUES (1, 'Test Artist', 'Hip-Hop', 5000);

-- Contact MONA de test
INSERT INTO mona_contacts (name, email, service, message) 
VALUES ('John Doe', 'john@example.com', 'MONA 390', 'Interested in MONA services');

-- Réservation SPARK de test
INSERT INTO spark_bookings (name, email, edition, participants) 
VALUES ('Jane Smith', 'jane@example.com', 'SPARK Weekend', 2);
*/
