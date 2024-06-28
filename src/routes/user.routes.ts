import express, { Request, Response } from 'express';
const userRoute = express.Router();

userRoute.route('/:userId')
  .get((req: Request, res: Response) => {
    res.send('GET USER BY ID');
  })
  .put((req: Request, res: Response) => {
    res.send('UPDATE USER BY ID');
  })
  .delete((req: Request, res: Response) => {
    res.send('DELETE USER BY ID');
  });

export default userRoute;