import { sign, SignOptions } from 'jsonwebtoken';
import 'dotenv/config';
import jwtDecode from 'jwt-decode';
import jwtToken from '../interfaces/IjwtToken';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET || 'jwtsecret';

export function generateToken(data: string):string {
  return sign({ data }, secret, jwtConfig);
}

export function decodeToken(token: string) {
  return jwtDecode<jwtToken>(token);
}

// Com a ajuda desse post!
// https://stackoverflow.com/questions/61199530/typescript-error-with-accessing-jwt-decode-object
