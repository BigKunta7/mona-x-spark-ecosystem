// ecosystem-mona-spark/app/api/src/finance/offerings.ts
import { Router, Request, Response } from 'express';
import { financeDB } from '../database';

// Mock d'un middleware d'authentification
// Dans une vraie application, cela viendrait d'un vrai middleware (ex: Passport.js, JWT)
const fakeAuthMiddleware = (req: any, res: Response, next: Function) => {
    req.user = { id: 1, artistId: 1, role: 'artist' }; // Artiste de test
    next();
};

const router = Router();

/**
 * @route   POST /api/finance/offerings
 * @desc    Créer une nouvelle offre d'investissement (drop)
 * @access  Private (Artiste authentifié)
 */
router.post('/', fakeAuthMiddleware, async (req: any, res: Response) => {
    const { 
        type = 'investment', // Valeur par défaut
        title, description, revenueSharePercentage, fundingGoal, 
        minInvestment, startDate, endDate, legalDocuments 
    } = req.body;
    
    // Validation des données
    if (!title || !fundingGoal || !startDate || !endDate || (type === 'investment' && !revenueSharePercentage)) {
        return res.status(400).json({ msg: 'Veuillez fournir tous les champs obligatoires.' });
    }

    try {
        const artistId = req.user.artistId;
        if (!artistId) {
            return res.status(403).json({ msg: 'Utilisateur non autorisé ou non lié à un profil artiste.' });
        }

        const newOffering = await financeDB.createOffering({
            artistId,
            type,
            title,
            description,
            revenueSharePercentage: type === 'investment' ? parseFloat(revenueSharePercentage) : 0,
            fundingGoal: parseFloat(fundingGoal),
            minInvestment: parseFloat(minInvestment) || 25.00,
            startDate,
            endDate,
            legalDocuments
        });

        res.status(201).json(newOffering);

    } catch (err: any) {
        console.error('Erreur lors de la création de l\'offre:', err);
        res.status(500).json({ error: 'Erreur serveur', details: err.message });
    }
});

/**
 * @route   GET /api/finance/offerings
 * @desc    Récupérer toutes les offres actives
 * @access  Public
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const offerings = await financeDB.getActiveOfferings();
        res.json(offerings);
    } catch (err: any) {
        console.error('Erreur lors de la récupération des offres:', err);
        res.status(500).json({ error: 'Erreur serveur', details: err.message });
    }
});

/**
 * @route   GET /api/finance/offerings/:id
 * @desc    Récupérer les détails d'une offre spécifique
 * @access  Public
 */
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ msg: 'ID de l\'offre invalide.' });
        }
        const offering = await financeDB.getOfferingById(id);
        if (!offering) {
            return res.status(404).json({ msg: 'Offre non trouvée.' });
        }
        res.json(offering);
    } catch (err: any) {
        console.error(`Erreur lors de la récupération de l'offre ${req.params.id}:`, err);
        res.status(500).json({ error: 'Erreur serveur', details: err.message });
    }
});

export default router;
