import morgan, { StreamOptions } from 'morgan';
import { IncomingMessage, ServerResponse } from 'http';
import config from './config';
import { logger } from './logger';

interface CustomResponse<T extends IncomingMessage = IncomingMessage> extends ServerResponse<T> {
  locals: {
    errorMessage?: string;
  };
}

morgan.token('message', (req, res) => {
  const customRes = res as CustomResponse;
  return customRes.locals.errorMessage || '';
});

const getIpFormat = (): string => (config.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400, 
  stream: { write: (message) => logger.info(message.trim()) } as StreamOptions,
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400, 
  stream: { write: (message) => logger.error(message.trim()) } as StreamOptions,
});

export { successHandler, errorHandler };