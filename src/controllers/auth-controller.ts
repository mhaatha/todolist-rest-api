import { Request, Response, NextFunction } from 'express';
import * as model from '../models/auth-model';
import * as service from '../services/auth-service';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: model.RegisterAndLoginRequest = req.body;
    const response: model.RegisterResponse = await service.register(data);

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
    const data: model.RegisterAndLoginRequest = req.body;
  } catch (error) {
    next(error);
  }
}