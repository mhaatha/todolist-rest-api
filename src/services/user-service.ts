import * as userValidation from '../validations/user-validation';
import { User } from '@prisma/client';
import { prisma } from '../../prisma';
import { validate } from '../validations/validation';
import { ResponseError } from '../utils/response-error';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { IdUsernameResponse, UsernameSchema, toAuthResponse } from '../models/user-model';

export const getUserByUsername = async (username: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      username
    }
  });
}

export const update = async (bodyData: UsernameSchema, bodyParams: string): Promise<IdUsernameResponse> => {
  const updateUser: UsernameSchema = validate(userValidation.updateUserBody, bodyData);

  // VALIDATION: Cannot have the same username
  const totalUserWithSameUsername: User | null = await getUserByUsername(updateUser.username);
  if (totalUserWithSameUsername) {
    throw new ResponseError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, 'Username already taken');
  }

  // Update Data
  const user = await prisma.user.update({
    where: {
      id: bodyParams
    },
    data: {
      username: updateUser.username
    }
  });

  return toAuthResponse(user);
}

export const deleted = async (bodyParams: string): Promise<User> => {
  const isUserExists: User | null = await prisma.user.findUnique({
    where: {
      id: bodyParams
    }
  });

  if (!isUserExists) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'User not found');
  }

  return await prisma.user.delete({
    where: {
      id: bodyParams
    }
  }); 
}