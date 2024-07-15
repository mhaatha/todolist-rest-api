import { v4 } from 'uuid';
import { prisma } from '../../prisma';
import { validate } from '../validations/validation';
import { TagRequest, TagResponse } from '../models/tag-model';
import { ResponseError } from '../utils/response-error';
import { tagBodyRequest } from '../validations/tag-validation';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const create = async (data: TagRequest): Promise<TagResponse> => {
  const createRequest: TagRequest = validate(tagBodyRequest, data);

  const tag = await prisma.tag.create({
    data: {
      id: v4(),
      name: createRequest.name
    }
  });

  return tag;
}

export const getTagById = async (id: string): Promise<TagResponse | null> => {
  return await prisma.tag.findUnique({
    where: {
      id
    }
  });
}

export const getAll = async (): Promise<TagResponse[]> => {
  const tag: TagResponse[] = await prisma.tag.findMany();
  if (tag.length < 1) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'Tag not found');
  }

  return tag;
}

export const update = async (data: string, tagId: string): Promise<TagResponse> => {
  const updateRequest: string = validate(tagBodyRequest, data);

  // VALIDATION: Check if tag exist
  const tag = await getTagById(tagId);
  if (!tag) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'Tag not found');
  }

  // UPDATE DATA
  const updatedTag = await prisma.tag.update({
    where: {
      id: tagId
    },
    data: {
      name: updateRequest
    }
  });

  return updatedTag;
}

export const deleted = async (tagId: string): Promise<TagResponse> => {
  // VALIDATION: Is tagId exists in the database
  const isTagExists: TagResponse | null = await getTagById(tagId);
  if (!isTagExists) {
    throw new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'tagId not found');
  }

  return await prisma.tag.delete({
    where: {
      id: tagId
    }
  });
}
