import { url } from "../config/db.config.js";

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = url;
db.posts = import("./post.model.js").default(mongoose, mongoosePaginate);
db.users = import("./user.model.js").default(mongoose, mongoosePaginate);
db.roles = import("./role.model.js").default(mongoose, mongoosePaginate);

export default db;
