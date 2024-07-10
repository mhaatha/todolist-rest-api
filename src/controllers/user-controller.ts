import * as service from '../services/user-service';
import { User } from '@prisma/client';
import { ResponseError } from '../utils/response-error';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { IdUsernameResponse, UsernamePasswordRequest } from '../models/user-model';

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
      data: {
        id: response.id,
        username: response.username
      }
    });
  } catch (error) {
    next(error);
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bodyData: UsernamePasswordRequest = req.body;
    const { userId } = req.params;
    const response: IdUsernameResponse = await service.update(bodyData, userId);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success update user',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const deleted = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    await service.deleted(userId);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success deleted user',
      data: null
    });
  } catch (error) {
    next(error);
  }
}