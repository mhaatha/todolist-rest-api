import { Request, Response, NextFunction } from 'express';
import * as model from '../models/auth.model';
import * as service from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: model.CreateUserRequest = req.body;
    const response = await service.register(data);
    return res.status(201).json({
      status: 201,
      message: 'Success create user',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const login = async (req: Request, res: Response) => {
  res.send('LOGIN');
}