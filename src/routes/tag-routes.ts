import * as tagController from '../controllers/tag-controller';
import express from 'express';
import { auth } from '../middlewares/auth-middleware';

const tagRoute = express.Router();

tagRoute.route('/')
  .post(auth, tagController.create)
  .get(auth, tagController.getAll);

tagRoute.route('/:tagId')
  .put(auth, tagController.update)
  .delete(auth, tagController.deleted);

export default tagRoute;