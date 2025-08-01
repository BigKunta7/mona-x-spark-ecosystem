-- Migration pour créer la table team_members
-- Ajout de la table pour gérer l'organigramme MONA x SPARK

CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    
    -- Rôle principal
    primary_role VARCHAR(100) NOT NULL,
    primary_department VARCHAR(100) NOT NULL,
    
    -- Rôles secondaires (backup)
    backup_roles TEXT[], -- Array des rôles de backup
    
    -- Squad assignments
    squad_assignments TEXT[], -- Array des squads assignés
    squad_lead_roles TEXT[], -- Array des squads où il est lead
    
    -- Compétences et spécialités
    skills TEXT[], -- Array des compétences
    specialties TEXT[], -- Array des spécialités
    
    -- Statut et disponibilité
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'temporary', 'external')),
    availability_percentage INTEGER DEFAULT 100,
    start_date DATE,
    end_date DATE,
    
    -- Informations de contact
    linkedin_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    bio TEXT,
    
    -- Métadonnées
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Index pour les performances
CREATE INDEX idx_team_members_email ON team_members(email);
CREATE INDEX idx_team_members_primary_role ON team_members(primary_role);
CREATE INDEX idx_team_members_department ON team_members(primary_department);
CREATE INDEX idx_team_members_status ON team_members(status);

-- Trigger pour updated_at
CREATE TRIGGER update_team_members_updated_at 
    BEFORE UPDATE ON team_members 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 