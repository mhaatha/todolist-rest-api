import * as userValidation from '../validations/user-validation';
import { User } from '@prisma/client';
import { prisma } from '../../prisma';
import { validate } from '../validations/validation';
import { ResponseError } from '../utils/response-error';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { IdUsernameResponse, UserIdSchema, UsernameSchema, toAuthResponse } from '../models/user-model';

export const getUserByUsername = async (username: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      username
    }
  });
}

export const update = async (bodyData: UsernameSchema, bodyParams: UserIdSchema): Promise<IdUsernameResponse> => {
  const updateUser: UsernameSchema = validate(userValidation.updateUserBody, bodyData);

  // VALIDATION: Cannot have the same username
  const totalUserWithSameUsername: User | null = await getUserByUsername(updateUser.username);
  if (totalUserWithSameUsername) {
    throw new ResponseError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, 'Username already taken');
  }

  // Update Data
  const user = await prisma.user.update({
    where: {
      id: bodyParams.userId
    },
    data: {
      username: updateUser.username
    }
  });

  return toAuthResponse(user);
}