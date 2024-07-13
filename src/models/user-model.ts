import { User } from '@prisma/client';

export interface UsernamePasswordRequest {
  username: string;
  password: string;
}

export interface IdUsernameResponse {
  id: string;
  username: string;
}

export function toAuthResponse(user: User): IdUsernameResponse {
  return {
    id: user.id,
    username: user.username
  }
}

export interface UsernameSchema {
  username: string;
}