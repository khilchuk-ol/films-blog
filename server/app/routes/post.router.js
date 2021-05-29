import express from "express";
import controller from "../controllers/posts.controller.js";

//const ALLOWED_IPS = ["127.0.0.1", "123.456.7.89"];

const api = express.Router();

/*api.use(function (req, res, next) {
  if (ALLOWED_IPS.indexOf(req.ip) === -1) {
    res.status(401).send("Not authorized!");
  } else {
    next();
  }
});*/

api.get("/", controller.findAll);

api.post("/create", controller.create);

api.get("/:id", controller.findOne);

api.get("/edit/:id", controller.findOne);
api.post("/edit/:id", controller.update);

api.get("/delete/:id", controller.findOne);
api.post("delete/:id", controller.remove);

export default api;
