import { Request, Response } from 'express';

const authRegister = async (req: Request, res: Response) => {
  res.send('REGISTER');
}

const authLogin = async (req: Request, res: Response) => {
  res.send('LOGIN');
}

export { authRegister, authLogin };