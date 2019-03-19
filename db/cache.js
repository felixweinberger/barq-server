/* eslint-disable no-console */
import redis from 'redis';

// redis connection
const REDIS_URI = `${process.env.REDIS_URL}:${process.env.REDIS_PORT}`;
const cache = redis.createClient(process.env.REDIS_URL);
cache.on('connect', () => console.log(`✓ - Connected to redis cache at ${REDIS_URI}`));
cache.on('error', () => console.log(`𐄂 - Could not connect to redis cache at ${REDIS_URI}`));

export default cache;
