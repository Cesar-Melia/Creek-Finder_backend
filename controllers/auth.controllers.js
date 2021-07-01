const passport = require("passport");

//Register
const registerGet = (req, res, next) => {
  //return res.status(200).json("register");
  return res.render("register");
};

const registerPost = (req, res, next) => {
  const { email, userName, password } = req.body;

  if (!email || !userName || !password) {
    const error = "Completa todos los campos";
    //return res.status(400).json("register", { error });
    return res.render("register", { error });
  }

  const done = (error, user) => {
    if (error) {
      return next(error);
    }

    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      return res.redirect("/");
    });
  };

  passport.authenticate("register", done)(req);
};

// login

const loginGet = (req, res, next) => {
  //return res.status(200).json("login");
  return res.render("login");
};

const loginPost = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Completa todos los campos");
    return res.status(400).json(error);
    // return res.render("register", { error });
  }

  const done = (error, user) => {
    console.log("error dentro done", error);
    if (error) return next(error);
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }

      return res.redirect("/");
    });
  };

  passport.authenticate("login", done)(req);
};

const logoutPost = (req, res, next) => {
  if (req.user) {
    req.logout();

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      return res.redirect("/");
    });
  } else {
    return res.status(200).json("No había usuario logueado");
  }
};

module.exports = {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  logoutPost,
};
