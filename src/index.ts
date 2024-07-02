import config from './configs/config';
import express from 'express';
import router from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { logger } from './configs/logger';
import { successHandler, errorHandler } from './configs/morgan';

const app = express();                                
const port = config.port || 3000;

// Middleware Morgan Logging
if (config.env !== 'test') {
  app.use(successHandler);
  app.use(errorHandler);
}

// Middleware Parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is online');
});   

app.use('/api/v1', router);   

// Middleware Error Handling
app.use(errorMiddleware);

app.listen(port, () => {
  logger.info(`Server listening on http://localhost:${port}`);
});
