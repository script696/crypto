import { Router } from 'express';
import { BotController } from 'controllers/bots';

export const router = Router();

router.post('/add', BotController.addBot);
