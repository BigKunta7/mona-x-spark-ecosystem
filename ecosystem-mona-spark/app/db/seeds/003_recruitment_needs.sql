-- Seed des besoins de recrutement MONA x SPARK
-- Basé sur l'organigramme startup horizontale

-- SDR sponsor/artistes dédié
INSERT INTO recruitment_needs (
    role_name, department, priority, description, 
    temporary_coverage, requirements, budget_range, timeline
) VALUES (
    'SDR sponsor/artistes dédié',
    'Core Team',
    'PRIORITÉ',
    'Sales Development Representative dédié à la prospection sponsors et artistes',
    ARRAY['Alexandre', 'Kake'],
    ARRAY['Expérience en prospection B2B', 'Connaissance du secteur culturel', 'Outils CRM', 'Capacité de closing'],
    '€35K-45K',
    'Immédiat'
);

-- Social Media Manager full-time
INSERT INTO recruitment_needs (
    role_name, department, priority, description, 
    temporary_coverage, requirements, budget_range, timeline
) VALUES (
    'Social Media Manager full-time',
    'Création & Production',
    'PRIORITÉ',
    'Gestionnaire réseaux sociaux à temps plein pour MONA et SPARK',
    ARRAY['Gilda', 'Valentine'],
    ARRAY['Expérience en gestion de comptes', 'Création de contenu', 'Analytics sociaux', 'Planning éditorial'],
    '€30K-40K',
    'Immédiat'
);

-- Ops Coordinator junior
INSERT INTO recruitment_needs (
    role_name, department, priority, description, 
    temporary_coverage, requirements, budget_range, timeline
) VALUES (
    'Ops Coordinator junior',
    'Ops, Admin & Support',
    'PHASE 2',
    'Coordinateur opérationnel junior pour supporter Khaïdja',
    ARRAY['Khaïdja'],
    ARRAY['Organisation', 'Gestion de projet', 'Outils de coordination', 'Communication'],
    '€25K-35K',
    'Phase 2'
);

-- Product Manager (plateforme / app)
INSERT INTO recruitment_needs (
    role_name, department, priority, description, 
    temporary_coverage, requirements, budget_range, timeline
) VALUES (
    'Product Manager (plateforme / app)',
    'Core Team',
    'PHASE 3',
    'Product Manager pour développer la plateforme MONA x SPARK',
    ARRAY['-'],
    ARRAY['Expérience en product management', 'Développement digital', 'UX/UI', 'Agile'],
    '€50K-70K',
    'Phase 3'
);

-- Coach scénique/artistique
INSERT INTO recruitment_needs (
    role_name, department, priority, description, 
    temporary_coverage, requirements, budget_range, timeline
) VALUES (
    'Coach scénique/artistique',
    'Création & Production',
    'À externaliser',
    'Coach artistique pour accompagner les artistes en développement',
    ARRAY['Freelance ponctuel'],
    ARRAY['Expérience en coaching artistique', 'Connaissance du secteur', 'Pédagogie', 'Réseau artistique'],
    '€100-200/h',
    'À la demande'
); 