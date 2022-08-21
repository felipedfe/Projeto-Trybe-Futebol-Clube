import { Router } from 'express';
import UserController from '../controller/user.controller';

const router = Router();

router.post('/', UserController.login);
router.get('/validate', UserController.validate);

export default router;
