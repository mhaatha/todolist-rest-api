import * as todolistController from '../controllers/todolist-controller';
import express from 'express';
import { auth } from '../middlewares/auth-middleware';

const todolistRoute = express.Router();

todolistRoute.route('/')
  .get(auth, todolistController.getAll)
  .post(auth, todolistController.create);

todolistRoute.route('/:todolistId')
  .put(auth, todolistController.update)
  .delete(auth, todolistController.deleted);

export default todolistRoute;