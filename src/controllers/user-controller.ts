import * as service from '../services/user-service';
import { User } from '@prisma/client';
import { Payload } from '../models/token-model';
import { UserRequest } from '../types/user-request';
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

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const bodyData: UsernamePasswordRequest = req.body;
    const userData: Payload | undefined = req.user as Payload;

    // VALIDATION: Is user authenticated
    if (userData === undefined) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, 'Unauthorized');
    }

    const response: IdUsernameResponse = await service.update(bodyData, userData.sub);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success update user',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const deleted = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const userData: Payload | undefined = req.user as Payload;

    // VALIDATION: Is user authenticated
    if (userData === undefined) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, 'Unauthorized');
    }

    await service.deleted(userData.sub);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success deleted user',
      data: null
    });
  } catch (error) {
    next(error);
  }
}