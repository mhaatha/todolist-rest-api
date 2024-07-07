import * as userController from '../controllers/user-controller';
import express from 'express';

const userRoute = express.Router();

userRoute.route('/:username')
  .get(userController.getUsername);

userRoute.route('/:userId')
  .put(userController.update)
  .delete(userController.deleted);

export default userRoute;