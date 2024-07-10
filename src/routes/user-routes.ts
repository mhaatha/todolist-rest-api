import * as userController from '../controllers/user-controller';
import express from 'express';
import { auth } from '../middlewares/auth-middleware';

const userRoute = express.Router();

userRoute.route('/:username')
  .get(auth, userController.getUsername);

userRoute.route('/:userId')
  .put(auth, userController.update)
  .delete(auth, userController.deleted);

export default userRoute;