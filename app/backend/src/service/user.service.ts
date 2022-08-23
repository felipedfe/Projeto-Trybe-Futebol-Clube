import * as bcrypt from 'bcryptjs';
import customError from '../helpers/customError';
import UserModel from '../database/models/user';
import UserLogin from '../interfaces/Ilogin';
import { generateToken, decodeToken } from '../helpers/token';
import jwtToken from '../interfaces/IjwtToken';

export default class UserService {
  // POST
  static verifyfields(email: string, password: string) {
    if (!email || !password) throw customError('BadRequest', 'All fields must be filled');

    if (password.length < 6) {
      throw customError('Unauthorized', 'Password must have at least 6 characters');
    }

    return null;
  }

  static async login(user: UserLogin) {
    const { email, password } = user;

    this.verifyfields(email, password);

    const findUser = await UserModel.findOne({
      where: { email },
      raw: true,
    });

    console.log('find user: ', findUser);
    if (!findUser) throw customError('Unauthorized', 'Incorrect email or password');

    const passwordCheck = await bcrypt.compare(password, findUser.password);
    if (passwordCheck === false) throw customError('Unauthorized', 'Incorrect email or password');

    const token = generateToken(email);
    console.log('decode: ', decodeToken(token));

    return token;
  }

  // GET
  static async validate(token: jwtToken) {
    const { data: email } = token;

    const findUser = await UserModel.findOne({
      where: { email },
      raw: true,
    });

    console.log(findUser);
    if (!findUser) throw customError('BadRequest', 'No user found');

    return findUser.role;
  }
}
