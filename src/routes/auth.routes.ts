import express from 'express';
import { authRegister, authLogin } from '../controllers/auth.controllers'; 
const authRoute = express.Router();

authRoute.post('/register', authRegister); 
authRoute.post('/login', authLogin);
  
export default authRoute;   