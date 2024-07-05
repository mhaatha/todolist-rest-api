import * as userModel from '../models/auth-model';
import { prisma } from '../../prisma';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import { validate } from '../validations/validation';
import * as authValidation from '../validations/auth-validation';
import { ResponseError } from '../utils/response-error';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const register = async (data: userModel.RegisterAndLoginRequest): Promise<userModel.RegisterResponse> => {
  const registerRequest: userModel.RegisterAndLoginRequest = validate(authValidation.register, data);

  // VALIDATION: Cannot have the same username
  const totalUserWithSameUsername: number = await prisma.user.count({
    where: {
      username: registerRequest.username
    }
  });
  if (totalUserWithSameUsername !== 0) {
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