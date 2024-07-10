import express, { Request, Response } from 'express';
import { auth } from '../middlewares/auth-middleware';
const todolistRoute = express.Router();

todolistRoute.route('/')
  .get(auth, (req: Request, res: Response) => {
    res.send('GET ALL TODOLISTS');
  })
  .post(auth, (req: Request, res: Response) => {
    res.send('CREATE TODOLIST');
  });

todolistRoute.route('/:todolistId')
  .put(auth,(req: Request, res: Response) => {
    res.send('UPDATE TODOLIST BY ID');
  })
  .delete(auth, (req: Request, res: Response) => {
    res.send('DELETE TODOLIST BY ID');
  });

export default todolistRoute;