// ecosystem-mona-spark/app/api/finance/index.ts

import { Router } from 'express';
import offeringsRouter from './offerings';
import investmentsRouter from './investments';
import payoutsRouter from './payouts';

const financeRouter = Router();

financeRouter.use('/offerings', offeringsRouter);
financeRouter.use('/investments', investmentsRouter);
financeRouter.use('/payouts', payoutsRouter);

export default financeRouter;
