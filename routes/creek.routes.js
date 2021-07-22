const express = require('express');
const router = express.Router();
const { upload, uploadToCloudinary } = require('../middlewares/file.middleware');
const {
  creekGet,
  createCreek,
  deleteCreek,
  creekEdit,
  creekGetById,
} = require('../controllers/creeks.controllers');
const { isAdmin, isAuth } = require('../middlewares/auth.middleware');

router.get('/', creekGet);

router.post('/create', [upload.single('img'), uploadToCloudinary], createCreek); //isAdmin

router.delete('/delete/:id', deleteCreek); //isAdmin

router.put('/edit/:id', [upload.single('img'), uploadToCloudinary], creekEdit); //isAdmin

router.get('/:id', creekGetById);

module.exports = router;
