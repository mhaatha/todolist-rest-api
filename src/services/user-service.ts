import { prisma } from "../../prisma";
import { User } from "@prisma/client";

export const getUserByUsername = async (username: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      username
    }
  });
}