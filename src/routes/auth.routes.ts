import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/v1/register', (req: Request, res: Response) => {
  res.send('REGISTER');
});

router.post('/api/v1/login', (req: Request, res: Response) => {
  res.send('LOGIN');
});

export default router;  