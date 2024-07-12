import * as service from '../services/todolist-service';
import { Payload } from '../models/token-model';
import { UserRequest } from '../types/user-request';
import { Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { TodolistRequest, TodolistResponse } from '../models/todolist-model';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { sub }: Payload | undefined = req.user as Payload;
    const data: TodolistRequest = req.body;
    const response: TodolistResponse = await service.create(data, sub);

    return res.status(StatusCodes.CREATED).json({
      status: ReasonPhrases.CREATED,
      message: 'Success create todolist',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const getAll = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const response: TodolistResponse[] = await service.getAll();

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success get all todolist',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const data: TodolistRequest = req.body;
    const params: string = req.params.todolistId;
    const response: TodolistResponse = await service.update(data, params);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success update todolist',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const deleted = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const params: string = req.params.todolistId;

    await service.deleted(params);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success deleted todolist',
      data: null
    });
  } catch (error) {
    next(error);
  }
}