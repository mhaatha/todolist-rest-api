import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../services/token-service';
import { UserRequest } from '../types/user-request';
import { ResponseError } from '../utils/response-error';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, 'Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, 'Token is missing');
    }

    const decodedPayload: string | JwtPayload = await verifyToken(token);
    (req as UserRequest).user = decodedPayload; 
    next();
  } catch (error) {
    next(error);
  }
}