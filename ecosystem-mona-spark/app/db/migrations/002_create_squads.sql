-- Migration pour créer les tables squads et squad_members
-- Gestion des équipes modulaires par projet

CREATE TABLE squads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    department VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed')),
    lead_member_id UUID REFERENCES team_members(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE squad_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    squad_id UUID REFERENCES squads(id) ON DELETE CASCADE,
    team_member_id UUID REFERENCES team_members(id) ON DELETE CASCADE,
    role_in_squad VARCHAR(100) NOT NULL, -- 'lead', 'member', 'support'
    responsibilities TEXT[],
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(squad_id, team_member_id)
);

-- Index pour les performances
CREATE INDEX idx_squads_name ON squads(name);
CREATE INDEX idx_squads_department ON squads(department);
CREATE INDEX idx_squad_members_squad ON squad_members(squad_id);
CREATE INDEX idx_squad_members_member ON squad_members(team_member_id);

-- Triggers pour updated_at
CREATE TRIGGER update_squads_updated_at 
    BEFORE UPDATE ON squads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_squad_members_updated_at 
    BEFORE UPDATE ON squad_members 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 