const express = require('express');
const router = express.Router();

const {
  userGet,
  userGetById,
  userGetLogged,
  userEdit,
  userAddFavorite,
  userDeleteFavorite,
  userDelete,
} = require('../controllers/user.controllers');
const { isAdmin, isAuth } = require('../middlewares/auth.middleware');

router.get('/', isAdmin, userGet);

router.get('/logged', isAuth, userGetLogged);

router.get('/:id', isAdmin, userGetById);

router.put('/edit/:id', isAdmin, userEdit);

router.put('/add-favorite/:creekId', isAuth, userAddFavorite);

router.put('/delete-favorite/:creekId', isAuth, userDeleteFavorite);

router.delete('/delete/:id', isAdmin, userDelete);

module.exports = router;
