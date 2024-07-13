import { ZodError } from 'zod';
import { ResponseError } from '../utils/response-error';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const handlePrismaError = (err: PrismaClientKnownRequestError) => {
  switch (err.code) {
    case 'P2002':
      // Handling duplicate key errors
      return new ResponseError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, 'Duplicate Key');
    case 'P2014':
      // Handling invalid id errors
      return new ResponseError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, 'Invalid Id');
    case 'P2003':
      // Handling invalid data errors
      return new ResponseError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, `Invalid Data ${err}`);
    default:
      // Handling all other errors
      return new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  }
};

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
  } else if (err instanceof PrismaClientKnownRequestError) {
    const errors = handlePrismaError(err);
    
    res.status(errors.status).json({
      status: errors.status,
      error: errors.error,
      message: errors.message
    });
  } else if (err instanceof JsonWebTokenError) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      error: ReasonPhrases.UNAUTHORIZED,
      message: 'Invalid token'
    });
  } else if (err instanceof TokenExpiredError) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      error: ReasonPhrases.UNAUTHORIZED,
      message: 'Token expired'
    });
  } else if (err instanceof ResponseError) {
    res.status(err.status).json({
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