import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  res.send('REGISTER');
}

export const login = async (req: Request, res: Response) => {
  res.send('LOGIN');
}