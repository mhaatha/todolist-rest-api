import * as todolistController from '../controllers/todolist-controller';
import express from 'express';
import { auth } from '../middlewares/auth-middleware';

const todolistRoute = express.Router();

todolistRoute.route('/')
  .post(auth, todolistController.create)
  .get(auth, todolistController.getAll);

todolistRoute.route('/:todolistId')
  .put(auth, todolistController.update)
  .delete(auth, todolistController.deleted);

export default todolistRoute;