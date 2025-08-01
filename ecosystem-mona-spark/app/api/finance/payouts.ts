// ecosystem-mona-spark/app/api/finance/payouts.ts

import { Router, Request, Response } from 'express';
// import { pool } from '../core/database';

const router = Router();

/**
 * @route   GET /api/finance/payouts/investment/:investmentId
 * @desc    Récupérer l'historique des paiements pour un investissement spécifique
 * @access  Private (Propriétaire de l'investissement)
 */
router.get('/investment/:investmentId', async (req: Request, res: Response) => {
    const { investmentId } = req.params;
    // const investor_id = req.user.id;

    // Logique pour récupérer l'historique des paiements
    // 1. Vérifier que l'utilisateur connecté est bien le propriétaire de l'investissement
    // 2. Récupérer tous les enregistrements de la table "payouts" pour cet investmentId
    // 3. Retourner l'historique
    return res.status(501).json({ msg: 'Route de l\'historique des paiements non implémentée.' });
});

/**
 * @route   POST /api/finance/payouts/trigger
 * @desc    (Admin/System) Déclencher le calcul et la distribution des revenus pour une période
 * @access  Private (Admin)
 */
router.post('/trigger', async (req: Request, res: Response) => {
    // Logique pour déclencher les paiements (processus complexe)
    // 1. Déterminer la période de revenus à traiter
    // 2. Pour chaque offre "completed" :
    //    a. Récupérer le revenu total généré par l'artiste sur la période
    //    b. Calculer le montant à distribuer (revenu * revenue_share_percentage)
    //    c. Pour chaque investissement confirmé dans cette offre :
    //       i. Calculer la part de ce montant dû à l'investisseur
    //       ii. [INTÉGRATION PAIEMENT] Envoyer le paiement à l'investisseur
    //       iii. Insérer un enregistrement dans la table "payouts"
    return res.status(501).json({ msg: 'Route de déclenchement des paiements non implémentée.' });
});

export default router;
