import * as service from '../services/todolist-tag-service';
import { UserRequest } from '../types/user-request';
import { Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { TodolistTagRequest, TodolistTagResponse } from '../models/todolist-tag-model';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const data: TodolistTagRequest = req.body;
    const response: TodolistTagResponse = await service.create(data);

    return res.status(StatusCodes.CREATED).json({
      status: ReasonPhrases.CREATED,
      message: 'Success create todolist tag',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const getAll = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const response: TodolistTagResponse[] = await service.getAll();

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success get all todolist tag',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { todolist_id, tag_id } = req.params;
    const data: TodolistTagRequest = req.body;
    const response: TodolistTagResponse = await service.update(data, todolist_id, tag_id);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success update todolist tag',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const deleted = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { todolist_id, tag_id } = req.params;

    await service.deleted(todolist_id, tag_id);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success deleted todolist tag',
      data: null
    });
  } catch (error) {
    next(error);
  }
}