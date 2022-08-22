import { Router } from 'express';
import TeamsController from '../controller/teams.controller';

const router = Router();

router.get('/', TeamsController.list);

export default router;
