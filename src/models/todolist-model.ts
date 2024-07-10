export interface TodolistRequest {
  name: string;
  priority: number;
  tags?: string[];
  userId: string;
}

export interface TodolistResponse {
  id: string;
  name: string;
  priority: number;
  tags: string[] | []; // default is []
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}