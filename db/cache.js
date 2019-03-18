/* eslint-disable no-console */
import redis from 'redis';

// redis connection
const cache = redis.createClient(process.env.REDIS_URL);
cache.on('connect', () => console.log(`✓ - Connected to redis cache at ${process.env.REDIS_URL}`));
cache.on('error', () => console.log(`𐄂 - Could not connect to redis cache at ${process.env.REDIS_URL}`));

export default cache;
