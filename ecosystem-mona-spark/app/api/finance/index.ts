// ecosystem-mona-spark/app/api/finance/index.ts

import { Router } from 'express';
import offeringsRouter from '../src/finance/offerings';
import investmentsRouter from './investments';
import payoutsRouter from './payouts';

const financeRouter = Router();

// Routes pour les offres d'investissement
financeRouter.use('/offerings', offeringsRouter);

// Routes pour les investissements
financeRouter.use('/investments', investmentsRouter);

// Routes pour les paiements
financeRouter.use('/payouts', payoutsRouter);

export default financeRouter;
