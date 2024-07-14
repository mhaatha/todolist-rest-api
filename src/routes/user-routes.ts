import * as userController from '../controllers/user-controller';
import express from 'express';
import { auth } from '../middlewares/auth-middleware';

const userRoute = express.Router();

// Get current user
userRoute.route('/')
  .get(auth, userController.getCurrentUser);

// Get user by username
userRoute.route('/:username')
  .get(auth, userController.getUsername);

userRoute.route('/update')
  .put(auth, userController.update);

userRoute.route('/delete')
  .delete(auth, userController.deleted);

export default userRoute;