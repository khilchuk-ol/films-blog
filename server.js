const express = require('express');
const cors = require('cors');
const logger = require("morgan");

const app = express();

let corsOptions = {
    origin: 'http://localhost:8081'
};

/* if u consider using ejs (embeded javascript) for views, 
 * app.set("views", path.resolve(__dirname, "views"));
 * app.set("view engine", "ejs");
 * 
 * add folder ./views where html pages with ejs will live
 * embeded js looks like:
 * <body>
 *   <%= message %>
 * </body>
 * 
 * app.get("/", function(request, response) {
 *    response.render("index", {
 *       message: "Hey everyone! This is my webpage."
 *    });
 * });
 * 
 * this will be rendered to plain html
 */

// configure app
app.use(cors(corsOptions));
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded());

// connect to db
import db from './app/models/index.js';
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
  .then(() => console.log('Connect to the database'))
  .catch(err => {
      console.log('Cannot connect to the database', err);
      process.exit();
  });

// api
app.get("/", (req, res) => {
    res.json({ message: "Welcome to films blog" });
});

// listen to port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});