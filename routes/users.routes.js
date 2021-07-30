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

router.get('/logged', isAuth, userGetLogged);

router.get('/:id', isAdmin, userGetById);

router.put('/edit/logged', [isAuth, upload.single('img'), uploadToCloudinary], userEditLogged);

router.put('/edit/:id', [isAdmin, upload.single('img'), uploadToCloudinary], userEdit);

router.put('/add-favorite/:creekId', isAuth, userAddFavorite);

router.put('/delete-favorite/:creekId', isAuth, userDeleteFavorite);

router.delete('/delete/:id', isAdmin, userDelete);

module.exports = router;
