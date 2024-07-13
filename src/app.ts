import cors from 'cors';
import router from './routes';
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';
import { errorHandler } from './middlewares/error-middleware';
import { ResponseError } from './utils/response-error';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
const xssClean = require('xss-clean') as () => express.RequestHandler;

export const app = express();

// HTTP Header security
app.use(helmet());

// Middleware Parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(xssClean());

// Gzip compression
app.use(compression());

// CORS
app.use(cors());
app.options('*', cors());

// Main API
app.use('/api/v1', router);

// Send 404 if route is not exists
app.use((req, res, next) => {
  next(new ResponseError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, 'Endpoint is not found'));
});

// Middleware Error Handler
app.use(errorHandler);