import * as todolistTagController from '../controllers/todolist-tag-controller';
import express from 'express';
import { auth } from '../middlewares/auth-middleware';

const todolistTagRoute = express.Router();

todolistTagRoute.route('/')
  .post(auth, todolistTagController.create)
  .get(auth, todolistTagController.getAll);

todolistTagRoute.route('/:todolistId/:tagId')
  .put(auth, todolistTagController.update)
  .delete(auth, todolistTagController.deleted);

export default todolistTagRoute;