-- MONA x SPARK - Base de Données MVP
-- Tables essentielles pour le fonctionnement de base

-- Table des utilisateurs (artistes, experts, sponsors)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('artist', 'expert', 'sponsor', 'admin')),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nda_signed BOOLEAN DEFAULT FALSE,
    nda_signed_at TIMESTAMP,
    consent_marketing BOOLEAN DEFAULT FALSE,
    consent_analytics BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Table des artistes (prolongation de users)
CREATE TABLE artists (
    id UUID PRIMARY KEY REFERENCES users(id),
    artist_name VARCHAR(255),
    genre VARCHAR(100),
    followers_count INTEGER DEFAULT 0,
    score_mona INTEGER DEFAULT 0,
    level VARCHAR(50) DEFAULT 'prospect',
    bio TEXT,
    social_media JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des experts (prolongation de users)
CREATE TABLE experts (
    id UUID PRIMARY KEY REFERENCES users(id),
    specialty VARCHAR(100) NOT NULL,
    years_experience INTEGER,
    hourly_rate DECIMAL(10,2),
    availability JSONB,
    rating DECIMAL(3,2) DEFAULT 0,
    missions_completed INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des sponsors (prolongation de users)
CREATE TABLE sponsors (
    id UUID PRIMARY KEY REFERENCES users(id),
    company_name VARCHAR(255),
    industry VARCHAR(100),
    budget_range VARCHAR(50),
    contact_person VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des missions (experts)
CREATE TABLE missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    expert_id UUID REFERENCES experts(id),
    artist_id UUID REFERENCES artists(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    budget DECIMAL(10,2),
    commission_rate DECIMAL(5,2) DEFAULT 25.00,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des villas SPARK
CREATE TABLE spark_villas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    genre VARCHAR(100),
    max_participants INTEGER DEFAULT 10,
    current_participants INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'planning' CHECK (status IN ('planning', 'open', 'full', 'in_progress', 'completed')),
    budget_total DECIMAL(10,2),
    budget_spent DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des candidatures SPARK
CREATE TABLE spark_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artist_id UUID REFERENCES artists(id),
    villa_id UUID REFERENCES spark_villas(id),
    motivation_text TEXT,
    portfolio_links JSONB,
    score_application INTEGER,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'waitlist')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des sponsors villas
CREATE TABLE villa_sponsors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    villa_id UUID REFERENCES spark_villas(id),
    sponsor_id UUID REFERENCES sponsors(id),
    package_type VARCHAR(50) CHECK (package_type IN ('principal', 'categoriel', 'activation', 'evenement')),
    amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid', 'completed')),
    contract_signed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des séquences d'automation
CREATE TABLE automation_sequences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('welcome', 'nurturing', 'upsell', 'spark', 'winback')),
    trigger_type VARCHAR(50) NOT NULL CHECK (trigger_type IN ('score_change', 'time_based', 'action')),
    trigger_conditions JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des emails/SMS envoyés
CREATE TABLE communications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    sequence_id UUID REFERENCES automation_sequences(id),
    type VARCHAR(20) CHECK (type IN ('email', 'sms', 'push')),
    subject VARCHAR(255),
    content TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    opened BOOLEAN DEFAULT FALSE,
    clicked BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'failed', 'bounced'))
);

-- Table des événements de scoring
CREATE TABLE scoring_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artist_id UUID REFERENCES artists(id),
    event_type VARCHAR(100) NOT NULL,
    points_change INTEGER NOT NULL,
    old_score INTEGER,
    new_score INTEGER,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des paiements
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    payment_type VARCHAR(50) CHECK (payment_type IN ('subscription', 'mission', 'sponsor', 'commission')),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    stripe_payment_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour les performances
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_artists_score ON artists(score_mona);
CREATE INDEX idx_experts_specialty ON experts(specialty);
CREATE INDEX idx_missions_status ON missions(status);
CREATE INDEX idx_spark_villas_status ON spark_villas(status);
CREATE INDEX idx_communications_user ON communications(user_id);
CREATE INDEX idx_scoring_events_artist ON scoring_events(artist_id);

-- Triggers pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_artists_updated_at BEFORE UPDATE ON artists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experts_updated_at BEFORE UPDATE ON experts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sponsors_updated_at BEFORE UPDATE ON sponsors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_missions_updated_at BEFORE UPDATE ON missions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_spark_villas_updated_at BEFORE UPDATE ON spark_villas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_spark_applications_updated_at BEFORE UPDATE ON spark_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_villa_sponsors_updated_at BEFORE UPDATE ON villa_sponsors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_automation_sequences_updated_at BEFORE UPDATE ON automation_sequences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
