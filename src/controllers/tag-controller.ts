import * as service from '../services/tag-service';
import { UserRequest } from '../types/user-request';
import { TagRequest, TagResponse } from '../models/tag-model';
import { Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const data: TagRequest = req.body;
    const response: TagResponse = await service.create(data);

    return res.status(StatusCodes.CREATED).json({
      status: ReasonPhrases.CREATED,
      message: 'Success create tag',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const getAll = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const response: TagResponse[] = await service.getAll();

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success get all tag',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const data: string = req.body;
    const params: string = req.params.tagId;
    const response: TagResponse = await service.update(data, params);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success update tag',
      data: response
    });
  } catch (error) {
    next(error);
  }
}

export const deleted = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const params: string = req.params.tagId;

    await service.deleted(params);

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Success deleted tag',
      data: null
    });
  } catch (error) {
    next(error);
  }
}