import { User } from "@prisma/client";

export interface RegisterAndLoginRequest {
  username: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  username: string;
}

export function toAuthResponse(user: User): RegisterResponse {
  return {
    id: user.id,
    username: user.username
  }
}