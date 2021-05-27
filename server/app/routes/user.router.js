import passport from "passport";
import express from "express";

import controller from "../controllers/users.controller.js";

const ALLOWED_IPS = ["127.0.0.1", "123.456.7.89"];

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated) {
    next();
  } else {
    req.flash("info", "You must be logged in to see this page");
    res.redirect("/login");
  }
};

const api = express.Router();

api.use(function (req, res, next) {
  if (ALLOWED_IPS.indexOf(req.ip) === -1) {
    res.status(401).send("Not authorized!");
  } else {
    next();
  }
});

//login
api.get("/login/failed", (req, res) => {
  res.status(401).send({
    message: "Failed to log in",
  });
});

api.post("/login", (req, res) => {
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login/failed",
    failureFlash: true,
  });

  const currentUser = (
    await controller.getById(req.session.passport.user)
  ).toObject();
  res.send(currentUser);
});

//logout
api.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

//register
api.post("/register", controller.create);

api.get("/", controller.findAll);

api.get("/:id", controller.findOne);

//edit profile
api.get("/edit/:id", ensureAuthenticated, controller.findOne);

api.post("/edit/:id", ensureAuthenticated, function (req, res) {
  if (controller.update(req, res)) {
    req.flash("info", "Profile updated!");
  }
  res.redirect("/edit");
});

api.get("/delete/:id", ensureAuthenticated, controller.findOne);
api.post("/delete/:id", ensureAuthenticated, (req, res) => {
  controller.remove(req, res);
  req.redirect("/logout");
});

export default api;
