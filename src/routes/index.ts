import { Router } from 'express';
import { router as botRouter } from '../routes/bots';
export const router = Router();

router.use('/bots', botRouter);
