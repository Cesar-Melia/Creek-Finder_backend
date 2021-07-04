const express = require('express');
const router = express.Router();
const { upload, uploadToCloudinary } = require('../middlewares/file.middleware');
const { creekGet, createCreek, deleteCreek, creekEdit, creekGetById } = require('../controllers/creeks.controller');
const { isAdmin, isAuth } = require('../middlewares/auth.middleware');

router.get('/', creekGet);

router.post('/create', [isAdmin, upload.single('img'), uploadToCloudinary], createCreek);

router.delete('/delete/:id', isAdmin, deleteCreek);

router.put('/edit/:id', [isAdmin, upload.single('image'), uploadToCloudinary], creekEdit);

router.get('/:id', creekGetById);

module.exports = router;
