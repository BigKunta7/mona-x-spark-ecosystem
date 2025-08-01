// ecosystem-mona-spark/app/api/finance/investments.ts

import { Router, Request, Response } from 'express';
// import { pool } from '../core/database';

const router = Router();

/**
 * @route   POST /api/finance/investments
 * @desc    Créer un nouvel investissement dans une offre
 * @access  Private (Investisseur/Fan authentifié)
 */
router.post('/', async (req: Request, res: Response) => {
    const { offering_id, amount_invested } = req.body;
    // const investor_id = req.user.id; // Supposant un middleware d'authentification

    // Logique pour créer un investissement
    // 1. Valider les données (offering_id, amount_invested)
    // 2. Vérifier que l'utilisateur (investor_id) est authentifié
    // 3. Vérifier que l'offre (offering_id) est active et n'est pas terminée
    // 4. Vérifier que le montant respecte le minimum d'investissement
    // 5. [INTÉGRATION PAIEMENT] Traiter le paiement via un service externe
    // 6. Si le paiement est réussi, insérer l'investissement dans la table "investments" avec statut 'confirmed'
    // 7. Mettre à jour le champ "amount_raised" de la table "offerings"
    // 8. Retourner la confirmation de l'investissement

    return res.status(501).json({ msg: 'Route de création d\'investissement non implémentée.' });
});

/**
 * @route   GET /api/finance/investments/me
 * @desc    Récupérer les investissements de l'utilisateur connecté
 * @access  Private
 */
router.get('/me', async (req: Request, res: Response) => {
    // const investor_id = req.user.id;

    // Logique pour récupérer le portefeuille
    // 1. Récupérer tous les investissements où investor_id = ID de l'utilisateur
    // 2. Joindre les détails des offres associées
    // 3. Retourner le portefeuille d'investissements
    return res.status(501).json({ msg: 'Route de portefeuille non implémentée.' });
});

export default router;
