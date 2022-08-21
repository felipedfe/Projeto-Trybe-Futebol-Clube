import { Request, Response } from 'express';
import { decodeToken } from '../helpers/token';
import customError from '../helpers/customError';
import UserModel from '../database/models/user';

const validateJwt = (req:Request, res:Response) => {
  const token = req.headers.authorization;

  try {
    
  } catch (error) {
    
  }
}