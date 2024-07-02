import { PrismaClient } from "@prisma/client";
import { logger } from "../src/configs/logger";

export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    },
    {
      emit: 'event',
      level: 'error'
    },
    {
      emit: 'event',
      level: 'info'
    },
    {
      emit: 'event',
      level: 'warn'
    }
  ]
});

prisma.$on('error', (e) => {
  logger.error({
    message: 'Prisma Errror',
    meta: e
  });
});

prisma.$on('warn', (e) => {
  logger.warn({
    message: 'Prisma Warning',
    meta: e
  });
});

prisma.$on('info', (e) => {
  logger.info({
    message: 'Prisma Info',
    meta: e
  });
});

prisma.$on('query', (e) => {
  logger.info({
    message: 'Prisma Query',
    meta: e
  });
});