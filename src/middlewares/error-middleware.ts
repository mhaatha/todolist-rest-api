import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { ResponseError } from '../utils/response-error';

export const errorHandler = (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    const errors = err.issues.map(issue => ({
      path: issue.path.join('.'),
      message: issue.message
    }));

    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      error: ReasonPhrases.BAD_REQUEST,
      message: errors
    });
  } else if (err instanceof ResponseError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: err.status,
      error: err.error,
      message: err.message
    });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong'
    });
  }
}