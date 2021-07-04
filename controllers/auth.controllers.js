const passport = require('passport');

const registerPost = (req, res, next) => {
  const { email, userName, password } = req.body;

  if (!email || !userName || !password) {
    const error = 'Completa todos los campos';
    return next(error);
  }

  const done = (error, user) => {
    if (error) {
      return next(error);
    }

    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }

      return res.json(user);
    });
  };

  passport.authenticate('register', done)(req);
};

const loginPost = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('Completa todos los campos');
    return next(error);
  }

  const done = (error, user) => {
    if (error) return next(error);

    req.logIn(user, (error, users) => {
      if (error) return next(error);

      return res.status(200).json(user);
    });
  };

  passport.authenticate('login', done)(req);
};

const logoutPost = (req, res, next) => {
  if (req.user) {
    req.logout();

    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      return res.redirect('/');
    });
  } else {
    return res.status(200).json('No había usuario logueado');
  }
};

module.exports = {
  registerPost,
  loginPost,
  logoutPost,
};
