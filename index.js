/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
import socket from './socket';

import routes from './routes';

dotenv.config();
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.SERVER_PORT || 3000;
const ENV = process.env.ENV || 'dev';

app
  .use(logger('tiny'))
  .use(cors())
  .use(express.static('public'))
  .use(express.json())
  .use(routes);

socket(io);

http.listen(PORT, (error) => {
  if (error) console.error('𐄂 - Unable to connect to the server: ', error);
  console.log(`✓ - Server listening on ${PORT} - ${ENV} environment.`);
});

export default app;
