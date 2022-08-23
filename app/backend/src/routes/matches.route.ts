import { Router } from 'express';
import MatchesController from '../controller/matches.controller';

const router = Router();

router.get('/', MatchesController.list);

export default router;
