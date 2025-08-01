// ecosystem-mona-spark/app/api/src/finance/payouts.ts
import { Router, Request, Response } from 'express';
import { financeDB } from '../database';

// Mock d'un middleware qui vérifie si l'utilisateur est un admin
const fakeAdminAuthMiddleware = (req: any, res: Response, next: Function) => {
    // Dans une vraie application, on vérifierait le rôle de l'utilisateur
    const isAdmin = true; // Supposons que l'utilisateur est admin
    if (isAdmin) {
        next();
    } else {
        res.status(403).json({ msg: 'Accès non autorisé. Seuls les administrateurs peuvent effectuer cette action.' });
    }
};

const router = Router();

/**
 * @route   POST /api/finance/payouts/periods
 * @desc    (Admin) Créer une nouvelle période de réclamation de revenus
 * @access  Private (Admin)
 */
router.post('/periods', fakeAdminAuthMiddleware, async (req: Request, res: Response) => {
    const { offeringId, name, startDate, endDate, totalRevenuePool } = req.body;

    if (!offeringId || !name || !startDate || !endDate || !totalRevenuePool) {
        return res.status(400).json({ msg: 'Tous les champs sont requis pour créer une période.' });
    }

    try {
        const newPeriod = await financeDB.createPayoutPeriod({
            offeringId,
            name,
            startDate,
            endDate,
            totalRevenuePool: parseFloat(totalRevenuePool)
        });
        res.status(201).json(newPeriod);
    } catch (err: any) {
        console.error('Erreur lors de la création de la période de paiement:', err);
        return res.status(500).json({ error: 'Erreur serveur', details: err.message });
    }
});

/**
 * @route   POST /api/finance/payouts/claim
 * @desc    (User) Réclamer les revenus pour un investissement sur une période donnée (Staking)
 * @access  Private (User)
 */
// Mock d'un middleware qui vérifie si l'utilisateur est authentifié
const fakeUserAuthMiddleware = (req: any, res: Response, next: Function) => {
    req.user = { id: 2, role: 'user' }; // Utilisateur investisseur de test
    next();
};

router.post('/claim', fakeUserAuthMiddleware, async (req: any, res: Response) => {
    const { investmentId, payoutPeriodId } = req.body;
    const investorId = req.user.id;

    if (!investmentId || !payoutPeriodId) {
        return res.status(400).json({ msg: 'ID de l\'investissement et de la période requis.' });
    }

    try {
        const payout = await financeDB.claimPayout({
            investmentId: parseInt(investmentId),
            payoutPeriodId: parseInt(payoutPeriodId),
            investorId
        });
        res.status(201).json(payout);
    } catch (err: any) {
        console.error('Erreur lors de la réclamation du paiement:', err);
        return res.status(500).json({ error: 'Erreur serveur', details: err.message });
    }
});

export default router;
