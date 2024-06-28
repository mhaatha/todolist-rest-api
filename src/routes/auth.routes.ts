import express, { Request, Response } from 'express';
const authRoute = express.Router();

authRoute.post('/register', (req: Request, res: Response) => {
  res.send('REGISTER');
}); 

authRoute.post('/login', (req: Request, res: Response) => {
  res.send('LOGIN');
});
  
export default authRoute;   