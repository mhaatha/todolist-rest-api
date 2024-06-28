import express, { Request, Response } from 'express';
const todolistRoute = express.Router();

todolistRoute.route('/')
  .get((req: Request, res: Response) => {
    res.send('GET ALL TODOLISTS');
  })
  .post((req: Request, res: Response) => {
    res.send('CREATE TODOLIST');
  });

todolistRoute.route('/:todolistId')
  .put((req: Request, res: Response) => {
    res.send('UPDATE TODOLIST BY ID');
  })
  .delete((req: Request, res: Response) => {
    res.send('DELETE TODOLIST BY ID');
  });

export default todolistRoute;