import * as userModel from '../models/auth.model';
import { prisma } from '../../prisma';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import { validate } from '../validations/validation';
import * as authValidation from '../validations/auth.validation'
import { responseError } from '../errors/response.error';

export const register = async (data: userModel.CreateUserRequest) => {
  const registerRequest = validate(authValidation.register, data);

  // VALIDATION: Cannot have the same username
  const totalUserWithSameUsername = await prisma.user.count({
    where: {
      username: registerRequest.username
    }
  });
  if (totalUserWithSameUsername !== 0) {
    throw responseError(400, 'Username already exists');
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