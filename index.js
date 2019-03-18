/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import redis from 'redis';

import routes from './routes';

// redis connection
const cache = redis.createClient(process.env.REDIS_URL);
cache.on('connect', () => console.log(`✓ - Connected to redis cache at ${process.env.REDIS_URL}`));
cache.on('error', () => console.log(`𐄂 - could not connect to redis cache at ${process.env.REDIS_URL}`));

// mongo connection
const MONGO_FULL_URI = `${process.env.MONGO_URL}:${process.env.MONGO_PORT}/owners`;
mongoose.connect(`${MONGO_FULL_URI}`, { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log(`✓ - connected to mongoDB at ${MONGO_FULL_URI}`));
mongoose.connection.on('error', () => console.log(`𐄂 - could not connect to mongoDB at ${MONGO_FULL_URI}`));

// server
const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const ENV = process.env.ENV || 'dev';

app
  .use(logger('tiny'))
  .use(cors())
  .use(express.json())
  .use(bodyParser.text('text/plain'))
  .use(routes);

app.listen(PORT, (error) => {
  if (error) console.error('𐄂 - unable to connect to the server: ', error);
  console.log(`✓ - server listening on ${PORT} - ${ENV} environment.`);
});

export default app;
