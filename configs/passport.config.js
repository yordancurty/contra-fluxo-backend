const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/User.model");

module.exports = function (app) {

  app.use(passport.initialize());


  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });


  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id })
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  });


  passport.use(
    new LocalStrategy(

      {
        usernameField: "email", 
        passwordField: "password", 
      },

      (username, password, done) => {

        User.findOne({ email: username })
          .then((user) => {

            if (!user) {
              return done(null, false, {
                message: "Incorrect username or password",
              });
            }

 
            if (!bcrypt.compareSync(password, user.passwordHash)) {
              return done(null, false, {
                message: "Incorrect username or password",
              });
            }


            done(null, user);
          })
          .catch((err) => {
            console.error(err);
            return done(err);
          });
      }
    )
  );

  passport.use(
    new JWTstrategy(
      {
        secretOrKey: process.env.TOKEN_SIGN_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};