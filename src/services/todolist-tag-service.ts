import { prisma } from '../../prisma';
import { validate } from '../validations/validation';
import { getTagById } from './tag-service';
import { ResponseError } from '../utils/response-error';
import { getTodolistById } from './todolist-service';
import { todolistTagBodyRequest } from '../validations/todolist-tag-validation';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { TodolistTagRequest, TodolistTagResponse } from '../models/todolist-tag-model';

export const create = async (data: TodolistTagRequest): Promise<TodolistTagResponse> => {
  const createRequest: TodolistTagRequest = validate(todolistTagBodyRequest, data);
  
  // VALIDATION: Is todolistId exists in the database
  const todolist = await getTodolistById(createRequest.todolistId);
  if (!todolist) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'todolistId not found');
  }

  // VALIDATION: Is tagId exists in the database
  const tag = await getTagById(createRequest.tagId);
  if (!tag) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'tagId not found');
  }

  const todolistTag = await prisma.todolist_Tag.create({
    data: {
      todolist_id: createRequest.todolistId,
      tag_id: createRequest.tagId
    }
  });

  return todolistTag;
}

export const getAll = async (): Promise<TodolistTagResponse[]> => {
  const todolistTag: TodolistTagResponse[] = await prisma.todolist_Tag.findMany();
  if (todolistTag.length < 1) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'TodolistTag not found');
  }

  return todolistTag;
}

export const update = async (data: TodolistTagRequest, todolistId: string, tagId: string): Promise<TodolistTagResponse> => {
  const updateRequest: TodolistTagRequest = validate(todolistTagBodyRequest, data);

  // VALIDATION: Is todolistId exists in the database
  const todolist = await getTodolistById(todolistId);
  if (!todolist) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'todolistId not found');
  }

  // VALIDATION: Is tagId exists in the database
  const tag = await getTagById(updateRequest.tagId);
  if (!tag) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'tagId not found');
  }

  // UPDATE DATA
  const updatedTodolistTag = await prisma.todolist_Tag.update({
    where: {
      todolist_id_tag_id: {
        todolist_id: todolistId,
        tag_id: tagId
      }
    },
    data: {
      todolist_id: updateRequest.todolistId,
      tag_id: updateRequest.tagId
    }
  });

  return updatedTodolistTag;
}

export const deleted = async (todolistId: string, tagId: string): Promise<TodolistTagResponse> => {
  // VALIDATION: Is todolistId exists in the database
  const todolist = await getTodolistById(todolistId);
  if (!todolist) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'todolistId not found');
  }
  
  // VALIDATION: Is tagId exists in the database
  const tag = await getTagById(tagId);
  if (!tag) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'tagId not found');
  }

  return await prisma.todolist_Tag.delete({
    where: {
      todolist_id_tag_id: {
        todolist_id: todolistId,
        tag_id: tagId
      }
    } 
  });
}