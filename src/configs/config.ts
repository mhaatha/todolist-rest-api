import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export default {
  env: process.env.NODE_ENV,
  port: 3000,
  database: {
    url: process.env.DATABASE_URL
  }
}