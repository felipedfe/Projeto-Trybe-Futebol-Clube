import { Router } from 'express';
import LeaderBoardController from '../controller/leaderBoard.controller';

const router = Router();

router.get('/home', LeaderBoardController.filterHomeTeams);

export default router;
