// ecosystem-mona-spark/app/api/src/finance/investments.ts
import { Router, Request, Response } from 'express';
import { financeDB } from '../database';

// Mock d'un middleware d'authentification pour un investisseur
const fakeAuthMiddleware = (req: any, res: Response, next: Function) => {
    // Cet utilisateur est un simple fan/investisseur, il n'a pas d'artistId
    req.user = { id: 2, role: 'user' }; 
    next();
};

// Mock d'un service de paiement
const fakePaymentProcessor = async (amount: number): Promise<{ success: boolean, transactionId: string }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const success = Math.random() > 0.1; // 90% de taux de succès
            resolve({
                success: success,
                transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            });
        }, 1000); // Simule une seconde de latence réseau
    });
};

const router = Router();

/**
 * @route   POST /api/finance/investments
 * @desc    Créer un nouvel investissement dans une offre
 * @access  Private (Investisseur/Fan authentifié)
 */
router.post('/', fakeAuthMiddleware, async (req: any, res: Response) => {
    const { offeringId, amountInvested } = req.body;
    const investorId = req.user.id;

    // 1. Validation des données
    if (!offeringId || !amountInvested || !investorId) {
        return res.status(400).json({ msg: 'Données d\'investissement manquantes.' });
    }

    const amount = parseFloat(amountInvested);
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ msg: 'Montant d\'investissement invalide.' });
    }

    try {
        // TODO: Ajouter une vérification pour s'assurer que l'offre est bien active
        // et que le montant est supérieur ou égal au minimum requis.

        // 2. Traitement du paiement
        const paymentResult = await fakePaymentProcessor(amount);
        if (!paymentResult.success) {
            return res.status(400).json({ msg: 'Le paiement a échoué.' });
        }

        // 3. Enregistrement de l'investissement en base de données
        const newInvestment = await financeDB.createInvestment({
            offeringId: parseInt(offeringId),
            investorId,
            amountInvested: amount,
            transactionId: paymentResult.transactionId
        });

        // 4. Retourner la confirmation
        res.status(201).json(newInvestment);

    } catch (err: any) {
        console.error('Erreur lors de la création de l\'investissement:', err);
        return res.status(500).json({ error: 'Erreur serveur', details: err.message });
    }
});

/**
 * @route   GET /api/finance/investments/me
 * @desc    Récupérer les investissements de l'utilisateur connecté
 * @access  Private
 */
router.get('/me', fakeAuthMiddleware, async (req: any, res: Response) => {
    const investorId = req.user.id;
    try {
        const investments = await financeDB.getInvestmentsByUserId(investorId);
        res.json(investments);
    } catch (err: any) {
        console.error(`Erreur lors de la récupération du portefeuille pour l'utilisateur ${investorId}:`, err);
        res.status(500).json({ error: 'Erreur serveur', details: err.message });
    }
});

export default router;
