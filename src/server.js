import express from 'express';
import { connectDB } from './config/mongodb';
import { env } from '*/config/env';

connectDB()
  .then(() => console.log('Connected successfully to database!'))
  .then(() => startServer())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const startServer = () => {
  const app = express();

  app.get('/', async (req, res) => {
    res.send('Hello world!');
  });

  app.get('/test', async (req, res) => {
    res.send('Hello world!!!');
  });

  app.listen(env.PORT, () => {
    console.log(`Example app listening on port http://localhost:${env.PORT}`);
  });
};
