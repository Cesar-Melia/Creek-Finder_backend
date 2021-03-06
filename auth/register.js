const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { isValidPassword, isValidEmail } = require('./utils');

const resgisterStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const error = new Error('El usuario ya existe');
        error.status = 400;
        return done(error);
      }

      if (!isValidEmail(email)) {
        const error = new Error('Email inválido');
        error.status = 400;
        return done(error);
      }

      if (!isValidPassword(password)) {
        const error = new Error('La contraseña debe contener 8 carácteres, 1 mayúscula, 1 minúscula');
        error.status = 400;
        return done(error);
      }

      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        email,
        password: hash,
        userName: req.body.userName,
      });

      const user = await newUser.save();

      console.log(user);

      user.password = null;
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

passport.use('register', resgisterStrategy);
