import express from 'express';
import router from './routes';
import { errorHandler } from './middlewares/error-middleware';

export const app = express();

// Middleware Parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

// Middleware Error Handler
app.use(errorHandler);