import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import UserService from '../service/user.service';
// import customError from '../helpers/customError';

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('Admin', salt);

console.log(bcrypt.compareSync('Admin', hash));
console.log(bcrypt.compareSync('senha_errada', hash));
console.log(hash);

export default class UserController {
  // POST
  static async login(req: Request, res: Response) {
    const user = req.body;
    const token = await UserService.login(user);
    // console.log(token);

    return res.status(200).json({ token });
  }
}
