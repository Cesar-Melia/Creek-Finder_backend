const express = require('express');
const router = express.Router();
const { upload, uploadToCloudinary } = require('../middlewares/file.middleware');

const {
  userGet,
  userGetById,
  userGetLogged,
  userEdit,
  userEditLogged,
  userAddFavorite,
  userDeleteFavorite,
  userDelete,
} = require('../controllers/user.controllers');
const { isAdmin, isAuth } = require('../middlewares/auth.middleware');

router.get('/', userGet); //isAdmin

router.get('/logged', userGetLogged); //isAuth

router.get('/:id', userGetById); //isAdmin

router.put('/edit/:id', [upload.single('img'), uploadToCloudinary], userEdit); //isAdmin

router.put('/edit/logged', [upload.single('img'), uploadToCloudinary], userEditLogged); //isAuth,

router.put('/add-favorite/:creekId', userAddFavorite); //isAuth

router.put('/delete-favorite/:creekId', userDeleteFavorite); // isAuth

router.delete('/delete/:id', userDelete); // isAdmin

module.exports = router;
