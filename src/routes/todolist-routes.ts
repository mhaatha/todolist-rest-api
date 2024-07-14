import * as todolistController from '../controllers/todolist-controller';
import express from 'express';
import { auth } from '../middlewares/auth-middleware';

const todolistRoute = express.Router();

todolistRoute.route('/')
  .post(auth, todolistController.create)
  .get(auth, todolistController.getTodolistByUserId);

todolistRoute.route('/:todolistId')
  .get(auth, todolistController.getTodolistById)
  .put(auth, todolistController.update)
  .delete(auth, todolistController.deleted);

export default todolistRoute;