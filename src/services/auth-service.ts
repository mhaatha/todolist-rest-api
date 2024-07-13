import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { User } from '@prisma/client';
import { prisma } from '../../prisma';
import { validate } from '../validations/validation';
import { ResponseError } from '../utils/response-error';
import { registerAndLogin } from '../validations/user-validation';
import { getUserByUsername } from './user-service';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { IdUsernameResponse, UsernamePasswordRequest, toAuthResponse } from '../models/user-model';

export const register = async (data: UsernamePasswordRequest): Promise<IdUsernameResponse> => {
  const registerRequest: UsernamePasswordRequest = validate(registerAndLogin, data);

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

  return toAuthResponse(user);
}

export const login = async (data: UsernamePasswordRequest): Promise<User> => {
  const registerRequest: UsernamePasswordRequest = validate(registerAndLogin, data);

  // VALIDATION: Is username exists in the database
  const user: User | null = await getUserByUsername(registerRequest.username);
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