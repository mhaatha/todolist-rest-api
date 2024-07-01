import { User } from "@prisma/client";

export interface CreateUserRequest {
  username: string;
  password: string;
}

export interface CreateUserResponse {
  id: string;
  username: string;
}

export function toAuthResponse(user: User): CreateUserResponse {
  return {
    id: user.id,
    username: user.username
  }
}