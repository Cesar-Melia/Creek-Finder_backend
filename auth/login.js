const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require('passport');


passport.serializeUser((user, done) => {
  return done(null, user._id)
})

passport.deserializeUser(async (userId, done) => {
  try {
    const existingUser = await User.findById(userId);
    return done(null, existingUser)
  } catch (error) {
    return done(error, null)
  }
})



const loginStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      let existingUser = await User.findOne({ email });

      if (!existingUser) {
        const error = new Error("El usuario no existe");
        error.status = 401;
        return done(error, null);
      }

      const isValidPassword = await bcrypt.compare(password, existingUser.password);

      if (!isValidPassword) {

        const error = new Error("tu contraseña no es válida!");
        error.status = 400;
        return done(error, null);
      }

      existingUser.password = null;
      return done(null, existingUser);
    } catch (error) {
      console.log("Error en la estrategia de login en passport.js", error);
      return done(error, null);
    }
  }
);


passport.use('login', loginStrategy);
// module.exports = loginStrategy;
