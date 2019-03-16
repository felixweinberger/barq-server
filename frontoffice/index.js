import redis from 'redis';

const client = redis.createClient(process.env.REDIS_URL);

console.log('hello');

export default client;
