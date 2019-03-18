/* eslint-disable no-console */
import mongoose from 'mongoose';

require('dotenv').config();

// mongo connection
const MONGO_FULL_URI = `${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_NAME}`;
mongoose.connect(`${MONGO_FULL_URI}`, { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log(`✓ - Connected to mongoDB at ${MONGO_FULL_URI}`));
mongoose.connection.on('error', () => console.log(`𐄂 - Could not connect to mongoDB at ${MONGO_FULL_URI}`));

export default mongoose;
