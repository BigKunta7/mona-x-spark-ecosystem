-- Migration pour créer la table recruitment_needs
-- Gestion des rôles manquants et priorités de recrutement

CREATE TABLE recruitment_needs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    priority VARCHAR(50) NOT NULL CHECK (priority IN ('PRIORITÉ', 'PHASE 2', 'PHASE 3', 'À externaliser')),
    description TEXT,
    temporary_coverage TEXT[], -- Array des membres qui couvrent temporairement
    requirements TEXT[],
    budget_range VARCHAR(100),
    timeline VARCHAR(100),
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'filled', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour les performances
CREATE INDEX idx_recruitment_needs_priority ON recruitment_needs(priority);
CREATE INDEX idx_recruitment_needs_department ON recruitment_needs(department);
CREATE INDEX idx_recruitment_needs_status ON recruitment_needs(status);

-- Trigger pour updated_at
CREATE TRIGGER update_recruitment_needs_updated_at 
    BEFORE UPDATE ON recruitment_needs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 