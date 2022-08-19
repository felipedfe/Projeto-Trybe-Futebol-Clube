import * as bcrypt from 'bcryptjs';
import customError from '../helpers/customError';
import UserModel from '../database/models/user';
import UserLogin from '../interfaces/Ilogin';
import generateToken from '../helpers/token';

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
    const { username: email, password } = user;

    this.verifyfields(email, password);

    const findUser = await UserModel.findOne({
      where: { email },
      raw: true,
    });

    if (!findUser) throw customError('Unauthorized', 'Username invalid');

    if (!bcrypt.compareSync(password, findUser.password)) {
      throw customError('Unauthorized', 'Password invalid');
    }
    // console.log(result);
    const token = generateToken(user);

    return token;
  }
}
