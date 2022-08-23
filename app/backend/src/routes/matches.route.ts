import { Router } from 'express';
import MatchesController from '../controller/matches.controller';

const router = Router();

router.get('/', MatchesController.list);
router.post('/', MatchesController.addMatch);
router.patch('/:id/finish', MatchesController.finishMatch);

export default router;
