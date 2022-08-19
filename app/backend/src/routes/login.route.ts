import { Router } from 'express';
import UserController from '../controller/user.controller';

const router = Router();

router.post('/login', UserController.login);

export default router;
