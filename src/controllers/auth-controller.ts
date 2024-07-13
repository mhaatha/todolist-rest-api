import * as service from '../services/auth-service';
import * as tokenService from '../services/token-service';
import { User } from '@prisma/client';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { IdUsernameResponse, UsernamePasswordRequest } from '../models/user-model';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: UsernamePasswordRequest = req.body;
    const response: IdUsernameResponse = await service.register(data);

    return res.status(StatusCodes.CREATED).json({
      status: ReasonPhrases.CREATED,
      message: 'Success create user',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: UsernamePasswordRequest = req.body;
    const user: User = await service.login(data);
    const response = await tokenService.generateAuthToken(user);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Login success',
      data: {
        id: user.id,
        username: user.username
      },
      tokens: response
    });
  } catch (error) {
    next(error);
  }
}