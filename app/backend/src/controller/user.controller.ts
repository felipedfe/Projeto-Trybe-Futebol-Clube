import { Request, Response } from 'express';
import UserService from '../service/user.service';
import customError from '../helpers/customError';
import { decodeToken } from '../helpers/token';

export default class UserController {
  // POST
  static async login(req: Request, res: Response) {
    // const { email, password } = req.body;

    // if (!email || !password) throw customError('BadRequest', 'All fields must be filled');

    const token = await UserService.login(req.body);

    return res.status(200).json({ token });
  }

  static async validate(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) throw customError('BadRequest', 'Token not found');

    const decodedAuth = decodeToken(authorization);

    const role = await UserService.validate(decodedAuth);

    return res.status(200).json({ role });
  }
}
