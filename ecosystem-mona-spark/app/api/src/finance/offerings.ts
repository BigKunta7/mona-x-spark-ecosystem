// ecosystem-mona-spark/app/api/src/finance/offerings.ts
import { Router, Request, Response } from 'express';
import { financeDB } from '../database';

// Types pour la validation des données
interface CreateOfferingRequest {
    type?: 'investment' | 'sovereignty';
    title: string;
    description?: string;
    revenueSharePercentage?: string;
    fundingGoal: string;
    minInvestment?: string;
    startDate: string;
    endDate: string;
    legalDocuments?: object;
}

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        artistId: number;
        role: string;
    };
}

// Mock d'un middleware d'authentification
// Dans une vraie application, cela viendrait d'un vrai middleware (ex: Passport.js, JWT)
const fakeAuthMiddleware = (req: Request, res: Response, next: Function) => {
    (req as AuthenticatedRequest).user = { id: 1, artistId: 1, role: 'artist' }; // Artiste de test
    next();
};

const router = Router();

/**
 * @route   POST /api/finance/offerings
 * @desc    Créer une nouvelle offre d'investissement (drop)
 * @access  Private (Artiste authentifié)
 */
router.post('/', fakeAuthMiddleware, async (req: AuthenticatedRequest, res: Response) => {
    const { 
        type = 'investment', // Valeur par défaut
        title, description, revenueSharePercentage, fundingGoal, 
        minInvestment, startDate, endDate, legalDocuments 
    } = req.body as CreateOfferingRequest;
    
    // Validation des données
    if (!title || !fundingGoal || !startDate || !endDate || (type === 'investment' && !revenueSharePercentage)) {
        return res.status(400).json({ 
            error: 'VALIDATION_ERROR',
            msg: 'Veuillez fournir tous les champs obligatoires.',
            required: type === 'investment' ? ['title', 'fundingGoal', 'startDate', 'endDate', 'revenueSharePercentage'] : ['title', 'fundingGoal', 'startDate', 'endDate']
        });
    }

    try {
        const artistId = req.user?.artistId;
        if (!artistId) {
            return res.status(403).json({ 
                error: 'AUTHENTICATION_ERROR',
                msg: 'Utilisateur non autorisé ou non lié à un profil artiste.' 
            });
        }

        // Validation des types de données
        const fundingGoalNum = parseFloat(fundingGoal);
        const minInvestmentNum = minInvestment ? parseFloat(minInvestment) : 25.00;
        const revenueSharePercentageNum = type === 'investment' && revenueSharePercentage ? parseFloat(revenueSharePercentage) : 0;

        if (isNaN(fundingGoalNum) || fundingGoalNum <= 0) {
            return res.status(400).json({ 
                error: 'VALIDATION_ERROR',
                msg: 'Le montant de financement doit être un nombre positif.' 
            });
        }

        if (isNaN(minInvestmentNum) || minInvestmentNum <= 0) {
            return res.status(400).json({ 
                error: 'VALIDATION_ERROR',
                msg: 'Le montant minimum d\'investissement doit être un nombre positif.' 
            });
        }

        if (type === 'investment' && (isNaN(revenueSharePercentageNum) || revenueSharePercentageNum <= 0 || revenueSharePercentageNum > 100)) {
            return res.status(400).json({ 
                error: 'VALIDATION_ERROR',
                msg: 'Le pourcentage de partage des revenus doit être entre 0 et 100.' 
            });
        }

        const newOffering = await financeDB.createOffering({
            artistId,
            type,
            title,
            description,
            revenueSharePercentage: revenueSharePercentageNum,
            fundingGoal: fundingGoalNum,
            minInvestment: minInvestmentNum,
            startDate,
            endDate,
            legalDocuments
        });

        return res.status(201).json({
            success: true,
            data: newOffering,
            message: 'Offre créée avec succès'
        });

    } catch (err: any) {
        console.error('Erreur lors de la création de l\'offre:', err);
        return res.status(500).json({ 
            error: 'SERVER_ERROR',
            msg: 'Erreur serveur lors de la création de l\'offre',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
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
        return res.json({
            success: true,
            data: offerings,
            count: offerings.length
        });
    } catch (err: any) {
        console.error('Erreur lors de la récupération des offres:', err);
        return res.status(500).json({ 
            error: 'SERVER_ERROR',
            msg: 'Erreur serveur lors de la récupération des offres',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
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
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ 
                error: 'VALIDATION_ERROR',
                msg: 'ID de l\'offre invalide. L\'ID doit être un nombre positif.' 
            });
        }

        const offering = await financeDB.getOfferingById(id);
        if (!offering) {
            return res.status(404).json({ 
                error: 'NOT_FOUND',
                msg: 'Offre non trouvée.' 
            });
        }

        return res.json({
            success: true,
            data: offering
        });
    } catch (err: any) {
        console.error(`Erreur lors de la récupération de l'offre ${req.params.id}:`, err);
        return res.status(500).json({ 
            error: 'SERVER_ERROR',
            msg: 'Erreur serveur lors de la récupération de l\'offre',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

export default router;
