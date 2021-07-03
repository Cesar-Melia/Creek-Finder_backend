const express = require("express");
// const router = express.Router()

const { isAuth } = require("../middlewares/auth.middleware");

const { registerGet, registerPost, loginGet, loginPost, logoutPost } = require("../controllers/auth.controllers");

const router = express.Router();

router.get("/register", registerGet);
router.post("/register", registerPost);

router.get("/login", loginGet);
router.post("/login", loginPost);

router.post("/logout", isAuth, logoutPost);

module.exports = router;
