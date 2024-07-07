import * as service from '../services/user-service';
import { User } from '@prisma/client';
import { ResponseError } from '../utils/response-error';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export const getUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.params.username;
    const response: User | null = await service.getUserByUsername(data);

    if (!response) {
      throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'Username not found');
    }
    
    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success get username',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bodyData = req.body;
    const { userId } = req.params;
    const response = await service.update(bodyData, { userId });

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success update user',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const deleted = (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (error) {
    next(error);
  }
}