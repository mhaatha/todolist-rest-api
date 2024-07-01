import express from 'express';
import * as authController from '../controllers/auth.controllers'; 
const authRoute = express.Router();

authRoute.post('/register', authController.register); 
authRoute.post('/login', authController.login);
  
export default authRoute;   