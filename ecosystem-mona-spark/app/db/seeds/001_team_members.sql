-- Seed des membres de l'équipe MONA x SPARK
-- Basé sur l'organigramme startup horizontale

-- CORE TEAM – MULTI-CASQUETTES

-- Kake – CEO & Lead Stratégie
INSERT INTO team_members (
    first_name, last_name, email, primary_role, primary_department,
    backup_roles, squad_assignments, squad_lead_roles,
    skills, specialties, bio, status
) VALUES (
    'Kake', '', 'kake@monaxspark.com', 'CEO & Lead Stratégie', 'Core Team',
    ARRAY['RH', 'Sales Closing'], 
    ARRAY['Squad Lancement Artiste', 'Squad Campagne Sponsors'],
    ARRAY['Squad Stratégie Générale'],
    ARRAY['Vision & direction générale', 'Recrutement', 'RH & culture interne', 'Sales closing sponsors majeurs'],
    ARRAY['Stratégie', 'Leadership', 'Business Development'],
    'CEO & Lead Stratégie - Vision & direction générale, recrutement RH & culture interne, sales closing sponsors majeurs',
    'active'
);

-- Alexandre – Head Artists & Growth
INSERT INTO team_members (
    first_name, last_name, email, primary_role, primary_department,
    backup_roles, squad_assignments, squad_lead_roles,
    skills, specialties, bio, status
) VALUES (
    'Alexandre', '', 'alexandre@monaxspark.com', 'Head Artists & Growth', 'Core Team',
    ARRAY['Business Intelligence', 'SDR'], 
    ARRAY['Squad Lancement Artiste'],
    ARRAY['Squad Lancement Artiste'],
    ARRAY['A&R', 'Développement des talents', 'SDR artistes', 'Business Intelligence', 'Suivi KPI', 'Funnel conversion'],
    ARRAY['A&R', 'Growth', 'Analytics'],
    'Head Artists & Growth - A&R + développement des talents, SDR artistes, Business Intelligence : suivi KPI, funnel conversion',
    'active'
);

-- Valentine – Creative Director & Brand
INSERT INTO team_members (
    first_name, last_name, email, primary_role, primary_department,
    backup_roles, squad_assignments, squad_lead_roles,
    skills, specialties, bio, status
) VALUES (
    'Valentine', '', 'valentine@monaxspark.com', 'Creative Director & Brand', 'Core Team',
    ARRAY['Communication', 'Community Management'], 
    ARRAY['Squad Lancement Artiste'],
    ARRAY['Squad Création & Brand'],
    ARRAY['Direction artistique globale', 'Social Media Strategy', 'Ligne éditoriale', 'Planning', 'Co-pilotage presse'],
    ARRAY['Creative Direction', 'Brand Strategy', 'Social Media'],
    'Creative Director & Brand - Direction artistique globale, Social Media Strategy : ligne éditoriale & planning, co-pilotage presse',
    'active'
);

-- Valentin – BizDev / BDR Senior
INSERT INTO team_members (
    first_name, last_name, email, primary_role, primary_department,
    backup_roles, squad_assignments, squad_lead_roles,
    skills, specialties, bio, status
) VALUES (
    'Valentin', '', 'valentin@monaxspark.com', 'BizDev / BDR Senior', 'Core Team',
    ARRAY['Négociation'], 
    ARRAY['Squad Campagne Sponsors'],
    ARRAY['Squad Campagne Sponsors'],
    ARRAY['Closing sponsors', 'Grands comptes', 'Négociation contrats', 'Définition pricing offres B2B'],
    ARRAY['Business Development', 'Sales', 'Partnerships'],
    'BizDev / BDR Senior - Closing sponsors / grands comptes, négociation contrats, définition pricing offres B2B',
    'active'
);

-- Mohand – Partenariats & Market Intelligence
INSERT INTO team_members (
    first_name, last_name, email, primary_role, primary_department,
    backup_roles, squad_assignments, squad_lead_roles,
    skills, specialties, bio, status
) VALUES (
    'Mohand', '', 'mohand@monaxspark.com', 'Partenariats & Market Intelligence', 'Core Team',
    ARRAY['Support stratégique'], 
    ARRAY['Squad Campagne Sponsors'],
    ARRAY['Squad Partenariats'],
    ARRAY['Développement B2B', 'Partenariats culturels', 'Veille tendances', 'Benchmark', 'Support stratégique'],
    ARRAY['Partnerships', 'Market Intelligence', 'B2B Development'],
    'Partenariats & Market Intelligence - Développement B2B (partenariats culturels), veille tendances / benchmark, support stratégique',
    'active'
);

-- CRÉATION & PRODUCTION

-- Mathis – Head Production Audiovisuelle
INSERT INTO team_members (
    first_name, last_name, email, primary_role, primary_department,
    backup_roles, squad_assignments, squad_lead_roles,
    skills, specialties, bio, status
) VALUES (
    'Mathis', '', 'mathis@monaxspark.com', 'Head Production Audiovisuelle', 'Création & Production',
    ARRAY['Montage'], 
    ARRAY['Squad Lancement Artiste'],
    ARRAY['Squad Production'],
    ARRAY['Réalisation son & vidéo', 'Supervision technique', 'Caméras', 'Setup villa', 'Gestion freelances prod', 'Monteurs', 'Cadreurs'],
    ARRAY['Production Audiovisuelle', 'Technical Supervision', 'Freelance Management'],
    'Head Production Audiovisuelle - Réalisation son & vidéo, supervision technique (caméras, setup villa), gestion freelances prod',
    'active'
);

-- Dylan – Motion & Visual Designer
INSERT INTO team_members (
    first_name, last_name, email, primary_role, primary_department,
    backup_roles, squad_assignments, squad_lead_roles,
    skills, specialties, bio, status
) VALUES (
    'Dylan', '', 'dylan@monaxspark.com', 'Motion & Visual Designer', 'Création & Production',
    ARRAY['Design'], 
    ARRAY['Squad Campagne Sponsors'],
    ARRAY['Squad Design'],
    ARRAY['Créations visuelles', 'Motion', 'Templates social media', 'Montage stories', 'Shorts rapides'],
    ARRAY['Motion Design', 'Visual Design', 'Social Media Templates'],
    'Motion & Visual Designer - Créations visuelles & motion, templates social media, montage stories / shorts rapides',
    'active'
);

-- Gilda – Content & Community
INSERT INTO team_members (
    first_name, last_name, email, primary_role, primary_department,
    backup_roles, squad_assignments, squad_lead_roles,
    skills, specialties, bio, status
) VALUES (
    'Gilda', '', 'gilda@monaxspark.com', 'Content & Community', 'Création & Production',
    ARRAY['Influence'], 
    ARRAY['Squad Lancement Artiste'],
    ARRAY['Squad Community'],
    ARRAY['Création contenu behind the scenes', 'Lifestyle', 'Social Media Management', 'Posting', 'Modération', 'Coordination influence', 'Collabs créateurs'],
    ARRAY['Content Creation', 'Community Management', 'Influence'],
    'Content & Community - Création contenu behind the scenes / lifestyle, Social Media Management (posting / modération), coordination influence & collabs créateurs',
    'active'
);

-- COMMUNICATION & INFLUENCE

-- Sandi – Presse & Influence
INSERT INTO team_members (
    first_name, last_name, email, primary_role, primary_department,
    backup_roles, squad_assignments, squad_lead_roles,
    skills, specialties, bio, status
) VALUES (
    'Sandi', '', 'sandi@monaxspark.com', 'Presse & Influence', 'Communication & Influence',
    ARRAY['Communication'], 
    ARRAY['Squad Campagne Sponsors'],
    ARRAY['Squad Communication'],
    ARRAY['Relations médias', 'Interviews', 'Com de crise', 'Storytelling RP', 'Influence TikTok/IG'],
    ARRAY['PR', 'Media Relations', 'Influence Marketing'],
    'Presse & Influence - Relations médias & interviews, com de crise & storytelling RP, influence TikTok/IG avec Gilda',
    'active'
);

-- OPS, ADMIN & SUPPORT

-- Khaïdja – Ops Manager
INSERT INTO team_members (
    first_name, last_name, email, primary_role, primary_department,
    backup_roles, squad_assignments, squad_lead_roles,
    skills, specialties, bio, status
) VALUES (
    'Khaïdja', '', 'khaidja@monaxspark.com', 'Ops Manager', 'Ops, Admin & Support',
    ARRAY['Coordination'], 
    ARRAY['Squad Événement SPARK'],
    ARRAY['Squad Événement SPARK'],
    ARRAY['Logistique', 'Plannings', 'Coordination projets', 'Support aux events SPARK', 'Pilotage de projet transverse'],
    ARRAY['Operations', 'Project Management', 'Logistics'],
    'Ops Manager - Logistique, plannings, coordination projets, support aux events SPARK, pilotage de projet transverse',
    'active'
);

-- O'Lwen – Admin, Juridique & Finances
INSERT INTO team_members (
    first_name, last_name, email, primary_role, primary_department,
    backup_roles, squad_assignments, squad_lead_roles,
    skills, specialties, bio, status
) VALUES (
    'O''Lwen', '', 'olwen@monaxspark.com', 'Admin, Juridique & Finances', 'Ops, Admin & Support',
    ARRAY['Juridique', 'Artistes'], 
    ARRAY['Squad Campagne Sponsors'],
    ARRAY['Squad Admin'],
    ARRAY['Contrats artistes', 'Contrats sponsors', 'Facturation', 'Déclarations', 'Compliance', 'Interface cabinet juridique', 'Fiscalité'],
    ARRAY['Legal', 'Finance', 'Administration'],
    'Admin, Juridique & Finances - Contrats artistes & sponsors, facturation, déclarations, compliance, interface cabinet juridique / fiscalité',
    'active'
); 