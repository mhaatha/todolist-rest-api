import { Payload } from '../models/token-model';
import { verifyToken } from '../services/token-service';
import { UserRequest } from '../types/user-request';
import { ResponseError } from '../utils/response-error';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Response, NextFunction } from 'express';

export const auth = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, 'Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, 'Token is missing');
    }

    const decodedPayload: Payload = await verifyToken(token);
    req.user = decodedPayload; 
    next();
  } catch (error) {
    next(error);
  }
}