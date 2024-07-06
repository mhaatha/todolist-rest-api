import * as userModel from '../models/auth-model';
import { prisma } from '../../prisma';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import { validate } from '../validations/validation';
import * as authValidation from '../validations/auth-validation';
import { ResponseError } from '../utils/response-error';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { User } from '@prisma/client';
import { getUserByUsername } from '../services/user-service';

export const register = async (data: userModel.RegisterAndLoginRequest): Promise<userModel.RegisterResponse> => {
  const registerRequest: userModel.RegisterAndLoginRequest = validate(authValidation.registerAndLogin, data);

  // VALIDATION: Cannot have the same username
  const totalUserWithSameUsername: User | null = await getUserByUsername(registerRequest.username);
  if (totalUserWithSameUsername) {
    throw new ResponseError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, 'Username already taken');
  }

  // ENCRYPT PASSWORD
  data.password = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      id: v4(),
      username: data.username,
      password: data.password
    }
  });

  return userModel.toAuthResponse(user);
}

export const login = async (data: userModel.RegisterAndLoginRequest): Promise<User> => {
  // VALIDATION: Is username exists in the database
  const user: User | null = await getUserByUsername(data.username);
  if (!user) {
    throw new ResponseError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, 'Username or password is incorrect');
  }
  
  // VALIDATION: Is password correct
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new ResponseError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, 'Username or password is incorrect');
  }

  return user;
}