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

export const getUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      id
    }
  });

  if (!user) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'User not');
  }

  return user;
}

export const update = async (bodyData: UsernameSchema, bodyParams: string): Promise<IdUsernameResponse> => {
  const updateUser: UsernameSchema = validate(userValidation.updateUserBody, bodyData);

  // VALIDATION: Cannot have the same username
  const username = await getUserByUsername(updateUser.username);
  if (username) {
    throw new ResponseError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, 'Username already exists');
  }

  // VALIDATION: Is user exists
  await getUserById(bodyParams);

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
  // VALIDATION: Is user exists
  const user: User | null = await getUserById(bodyParams);

  // So if you want to delete a user, you have to delete all of its todos
  await prisma.todolist.deleteMany({
    where: {
      userId: user!.id
    }
  });

  return await prisma.user.delete({
    where: {
      id: user!.id
    }
  });
}