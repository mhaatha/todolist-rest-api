export interface TodolistRequest {
  name: string;
  priority: number;
  userId: string;
}

export interface TodolistResponse {
  id: string;
  name: string;
  priority: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}