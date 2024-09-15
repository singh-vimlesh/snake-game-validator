import { Router } from 'express';
import { newGame, validateGameMoves } from '../controllers/game.controller';

const router = Router();

router.get('/new', newGame);
router.post('/validate', validateGameMoves);

export default router;
