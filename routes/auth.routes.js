const express = require('express');
const router = express.Router();

const { isAuth } = require('../middlewares/auth.middleware');

const {
  registerPost,
  loginPost,
  logoutPost,
} = require('../controllers/auth.controllers');

router.post('/register', registerPost);
router.post('/login', loginPost);
router.post('/logout', logoutPost); // isAuth

module.exports = router;
