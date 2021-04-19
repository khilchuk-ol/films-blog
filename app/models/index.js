import { url } from '../config/db.config.js';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = url;
db.posts = require('./post.model.js').default(mongoose);

export default db;