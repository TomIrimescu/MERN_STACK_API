import mongoose from 'mongoose';

require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI_DEV;

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.Promise = global.Promise;
export const connect = () => mongoose.connect(MONGO_URI, config);
