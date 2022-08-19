import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import userLogin from '../interfaces/Ilogin';
// import User from '../interfaces/user.interface';
// import UserLogin from '../interfaces/userLogin.interface';
// import JwtConfig from '../interfaces/jwtConfig';

// const jwtConfig: JwtConfig = {
//   expiresIn: '7d',
//   algorithm: 'HS256',
// };

const secret = process.env.JWT_SECRET;

function generateToken(data: userLogin):string {
  return sign({ data }, secret as string);
}

export default generateToken;
