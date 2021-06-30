const express = require('express');
const router = express.Router();
const { upload, uploadToCloudinary } = require('../middlewares/file.middleware');
const { creekGet, createCreek, deleteCreek, creekEdit, creekGetById } = require('../controllers/creeks.controller');

router.get('/', creekGet);

router.post('/create', [upload.single('img'), uploadToCloudinary], createCreek);

router.delete('/delete/:id', deleteCreek);

router.put('/edit/:id', [upload.single('image'), uploadToCloudinary], creekEdit);

router.get('/:id', creekGetById);

module.exports = router;
