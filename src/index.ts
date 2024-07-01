import 'dotenv/config';
import express from 'express';
import router from './routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();                                
const port = process.env.PORT || 3000;

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
  console.log(`Server listening on http://localhost:${port}`);
});
