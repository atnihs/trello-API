import express from 'express';
import cors from 'cors';
import { corsOptions } from '*/config/cors';
import { connectDB } from './config/mongodb';
import { env } from '*/config/env';
import { apiV1 } from '*/routes/v1';

connectDB()
  .then(() => console.log('Connected successfully to database!'))
  .then(() => startServer())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const startServer = () => {
  const app = express();

  app.use(cors(corsOptions));

  // Enable req.body data
  app.use(express.json());

  // Use APIs
  app.use('/v1', apiV1);

  app.listen(env.PORT, () => {
    console.log(`Example app listening on port http://localhost:${env.PORT}`);
  });
};
