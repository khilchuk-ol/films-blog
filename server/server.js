import express from "express";
import cors from "cors";
import logger from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import expSession from "express-session";
import flash from "connect-flash";
import passport from "passport";
import { dirname } from "path";
import { fileURLToPath } from "url";

import postRouter from "./app/routes/post.router.js";
import userRouter from "./app/routes/user.router.js";
import imgRouter from "./app/routes/img.route.js";
import setUpPassport from "./app/setuppassport.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

let corsOptions = {
  origin: "http://localhost:8081",
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
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());

app.use(
  expSession({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//for static files
const staticPath = path.resolve(__dirname, "public");
app.use(express.static(staticPath));

// connect to db
import db from "./app/models/models.js";
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to the database"))
  .catch((err) => {
    console.log("Cannot connect to the database", err);
    process.exit();
  });

setUpPassport();

//set user as local variable, so that views can see it
app.use(async function (req, res, next) {
  if (req.session.passport && req.session.passport.user) {
    res.locals.currentUser = (
      await controller.getById(req.session.passport.user)
    ).toObject();
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
  }
  next();
});

//routing
/*
 * parameters:
 * app.get("/users/:userid", (req, res) => {
 *   let userId = parseInt(req.params.userid, 10);
 * });
 *
 * app.get(/^\/users\/(\d+)$/, function(req, res) {
 *   let userId = parseInt(req.params[0], 10);
 * });
 *
 * app.get(/^\/users\/(\d+)-(\d+)$/, function(req, res) {
 *   let startId = parseInt(req.params[0], 10);
 *   let endId = parseInt(req.params[1], 10);
 * });
 *
 * query arguments:
 * url: https://www.google.com/search?q=javascript-themed%20burrito
 * app.get("/search", function(req, res) {
 *   // req.query.q == "javascript-themed burrito"
 * });
 *
 *
 */

// api

app.get("/api/", (req, res) => {
  res.json({ message: "Welcome to films blog" });
});

//routers
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/img", imgRouter);

// listen to port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
