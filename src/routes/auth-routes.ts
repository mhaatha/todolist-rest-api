import * as authController from '../controllers/auth-controller'; 
import express from 'express';

const authRoute = express.Router();

authRoute.post('/register', authController.register); 
authRoute.post('/login', authController.login);
  
export default authRoute;   