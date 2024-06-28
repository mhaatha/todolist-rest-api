import express, { Request, Response } from 'express';

const router = express.Router();

router.route('/api/v1/todolists')
  .get((req: Request, res: Response) => {
    res.send('GET ALL TODOLISTS');
  })
  .post((req: Request, res: Response) => {
    res.send('CREATE TODOLIST');
  });

router.route('/api/v1/todolists/:todolistId')
  .put((req: Request, res: Response) => {
    res.send('UPDATE TODOLIST BY ID');
  })
  .delete((req: Request, res: Response) => {
    res.send('DELETE TODOLIST BY ID');
  });

export default router;