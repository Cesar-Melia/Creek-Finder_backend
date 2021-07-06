const passport = require('passport');

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    const error = new Error('No hay un usuario autenticado');
    return next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') {
      return next();
    } else {
      const error = new Error('No hay un usuario autenticado');
      return next(error);
    }
  } else {
    const error = new Error('Solo accesible para Administrador');
    return next(error);
  }
};

module.exports = {
  isAuth,
  isAdmin,
};
