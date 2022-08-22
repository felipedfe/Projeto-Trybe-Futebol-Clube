import { Router } from 'express';
import TeamsController from '../controller/teams.controller';

const router = Router();

router.get('/', TeamsController.list);
router.get('/:id', TeamsController.getById);

export default router;
