import 'dotenv/config';
import express from 'express';
import router from './routes';

const app = express();                                
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is online');
});   

app.use('/api/v1', router);      

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
