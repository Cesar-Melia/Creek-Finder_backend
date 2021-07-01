const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const user = require("../models/User");

const loginStrategy = new LocalStrategy(
  {
    usernameField: "email", // nombre del campo de nuestro modelo que usaremos para autenticar -> req.body.email
    passwordField: "password", // nombre del campo de nuestro modelo que usaremos para la contraseña -> req.body.password
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    /**
     * Metemos la lógica de login con todas las excepciones que se nos ocurran
     * 1. Que si exista el usuario
     * 2. Que si coincida la contraseña que viene del body con la de la base de datos
     */

    try {
      let existingUser = await User.findOne({ email });

      if (!existingUser) {
        const error = new Error("El usuario no existe");
        error.status = 401;
        return done(error, null);
      }

      const isValidPassword = await bcrypt.compare(password, existingUser.password);

      if (!isValidPassword) {
        const error = new Error("Jose María dice que tu contraseña no es válida!");
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

//Creamos la estrategia de REGISTER.

const registerStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },

  async (req, email, password, done) => {
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        const error = new Error("El usuario ya existe");
        return done(error, null);
      }

      if (!isValidEmail(email)) {
        const error = new Error("Email no válido");
        return done(error, null);
      }

      if (!isValidPassword(password)) {
        const error = new Error("Contraseña inválida");
        return done(error, null);
      }

      // Encriptamos la contraseña del usuario para hacerla segura
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      //Creamos la instancia del modelo User

      const newUser = new User({
        email: email,
        password: passwordHash, // Ahora cambiamos esto y hasheamos.
        name: req.body.name,
        lastName: req.body.lastName,
        username: req.body.username,
      });

      //Guardamos el nuevo user en nuestra base de datos.
      const savedUser = await newUser.save();

      savedUser.password = null;
      return done(null, savedUser);
    } catch (error) {
      return done(error, null);
    }
  }
);

module.exports = loginStrategy;
