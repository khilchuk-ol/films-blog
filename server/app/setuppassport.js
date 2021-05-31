import passport from "passport";
import passportLocal from "passport-local";

import db from "./models/models.js";
const User = db.users;

const LocalStrategy = passportLocal.Strategy;

passport.use(
  "login",
  new LocalStrategy("local-signup", function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {
          message: "No user has such username",
        });
      }

      user.checkPassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Invalid password",
          });
        }
      });
    });
  })
);

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
