import { v4 } from 'uuid';
import { User } from '@prisma/client';
import { prisma } from '../../prisma';
import { validate } from '../validations/validation';
import { getUserById } from './user-service';
import { ResponseError } from '../utils/response-error';
import { todolistBodyRequest } from '../validations/todolist-validation';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { TodolistRequest, TodolistResponse } from '../models/todolist-model';

export const create = async (data: TodolistRequest): Promise<TodolistResponse> => {
  const createRequest: TodolistRequest = validate(todolistBodyRequest, data);

  // VALIDATION: Is userId exists in the database
  const user: User | null = await getUserById(createRequest.userId);
  if (!user) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'userId not found');
  }

  const todolist = await prisma.todolist.create({
    data: {
      id: v4(),
      name: createRequest.name,
      priority: createRequest.priority,
      userId: createRequest.userId
    }
  });

  return todolist;
}

export const getTodolistById = async (todolistId: string, userId: string): Promise<TodolistResponse | null> => {
  const todolist = await prisma.todolist.findFirst({
    where: {
      AND: {
        id: todolistId,
        userId: userId
      }
    }
  });

  if (!todolist) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'Todolist not found');
  }

  return todolist;
}

export const getAll = async (userId: string): Promise<TodolistResponse[]> => {
  const todolist: TodolistResponse[] = await prisma.todolist.findMany({
    where: {
      userId
    }
  });

  if (todolist.length < 1) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'Todolist not found');
  }

  return todolist;
}

export const update = async (data: TodolistRequest, todolistId: string, userId: string): Promise<TodolistResponse> => {
  const updateRequest: TodolistRequest = validate(todolistBodyRequest, data);

  // VALIDATION: Is todolistId exists in the database
  await getTodolistById(todolistId, userId);

  // VALIDATION: Is userId exists in the database
  await getUserById(updateRequest.userId);

  // UPDATE DATA
  const todolist = await prisma.todolist.update({
    where: {
      id: todolistId
    },
    data: updateRequest
  });

  return todolist;
}

export const deleted = async (todolistId: string, userId: string): Promise<TodolistResponse> => {
  // VALIDATION: Is todolistId exists in the database
  await getTodolistById(todolistId, userId);

  return await prisma.todolist.delete({
    where: {
      id: todolistId
    }
  });
}
