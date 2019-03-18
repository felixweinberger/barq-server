/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import redis from 'redis';

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

export default app;
