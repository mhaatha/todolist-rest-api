import * as userController from '../controllers/user-controller';
import express from 'express';

const userRoute = express.Router();

userRoute.route('/:userId')
  .get(userController.getId)
  .put(userController.update)
  .delete(userController.deleted);

export default userRoute;