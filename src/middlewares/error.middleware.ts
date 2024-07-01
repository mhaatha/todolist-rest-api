import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

interface CustomError extends Error {
  status?: number;
  message: string;
}

export const errorMiddleware = async (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    const formattedErrors = error.flatten((issue) => issue.message);
    const errorMessages = Object.values(formattedErrors.fieldErrors)
      .flat()
      .join('; ');

    res.status(400).json({
      status: 400,
      message: `Validation Error: ${errorMessages}`
    });
  } else if ('status' in error) {
    res.status(error.status || 500).json({
      status: error.status,
      message: error.message
    });
  } else {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
}