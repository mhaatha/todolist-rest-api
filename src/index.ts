import 'dotenv/config';
import express, { Request, Response } from 'express';
import authApi from './routes/auth.routes';
import userApi from './routes/user.routes';
import todolistApi from './routes/todolist.routes';

const app = express();                                
const port = process.env.PORT || 3000;

app.use(authApi);
app.use(userApi);
app.use(todolistApi);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
