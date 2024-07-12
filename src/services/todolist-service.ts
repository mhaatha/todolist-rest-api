import { v4 } from 'uuid';
import { User } from '@prisma/client';
import { prisma } from '../../prisma';
import { validate } from '../validations/validation';
import { getUserById } from './user-service';
import { ResponseError } from '../utils/response-error';
import { todolistBodyRequest } from '../validations/todolist-validation';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { TodolistRequest, TodolistResponse } from '../models/todolist-model';

export const create = async (data: TodolistRequest, userId: string): Promise<TodolistResponse> => {
  const createRequest: TodolistRequest = validate(todolistBodyRequest, data);

  // VALIDATION: Is userId exists in the database
  const user: User | null = await getUserById(userId);
  if (!user) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'userId not found');
  }

  const todolist = await prisma.todolist.create({
    data: {
      id: v4(),
      name: createRequest.name,
      priority: createRequest.priority,
      userId
    }
  });

  return todolist;
}

const getTodolistById = async (todolistId: string): Promise<TodolistResponse | null> => {
  return await prisma.todolist.findUnique({
    where: {
      id: todolistId
    }
  });
}

export const getAll = async (): Promise<TodolistResponse[]> => {
  const todolist: TodolistResponse[] = await prisma.todolist.findMany();
  if (todolist.length < 1) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'Todolist not found');
  }

  return todolist;
}

export const update = async (data: TodolistRequest, todolistId: string): Promise<TodolistResponse> => {
  const updateRequest: TodolistRequest = validate(todolistBodyRequest, data);

  // VALIDATION: Is todolistId exists in the database
  const isTodolistExists: TodolistResponse | null = await getTodolistById(todolistId);
  if (!isTodolistExists) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'todolistId not found');
  }

  // VALIDATION: Is userId exists in the database
  const user: User | null = await getUserById(updateRequest.userId);
  if (!user) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'userId not found');
  }

  // UPDATE DATA
  const todolist = await prisma.todolist.update({
    where: {
      id: todolistId
    },
    data: updateRequest
  });

  return todolist;
}

export const deleted = async (todolistId: string): Promise<TodolistResponse> => {
  // VALIDATION: Is todolistId exists in the database
  const isTodolistExists: TodolistResponse | null = await getTodolistById(todolistId);
  if (!isTodolistExists) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'todolistId not found');
  }

  return await prisma.todolist.delete({
    where: {
      id: todolistId
    }
  });
}
