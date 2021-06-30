const express = require('express');
const Creek = require('../models/Creek');
const router = express.Router();
const { upload, uploadToCloudinary } = require('../middlewares/file.middleware');

router.get('/', async (req, res, next) => {
  try {
    const creeks = await Creek.find();

    return res.status(200).json(creeks);
  } catch (error) {
    return next(error);
  }
});

router.post('/create', [upload.single('img'), uploadToCloudinary], async (req, res, next) => {
  console.log('Entra hasta aqui');

  try {
    const { name, province, type, description, lat, lng } = req.body;

    const img = req.fileUrl ? req.fileUrl : '';

    const newCreek = new Creek({
      name,
      img,
      province,
      type,
      description,
      lat,
      lng,
    });

    const createdCreek = await newCreek.save();

    console.log(createdCreek);

    return res.status(201).json(createdCreek);
  } catch (error) {
    return next(error);
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log('id: ', id);

    const deletedCreek = await Creek.findByIdAndDelete(id);

    let response = '';
    if (deletedCreek) {
      response = 'creek deleted';
    } else {
      response = 'creek not found';
    }
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});

// upload

router.put('/edit/:id', [upload.single('image'), uploadToCloudinary], async (req, res, next) => {
  const { id } = req.params;
  const { name, province, type, description, lat, lng } = req.body;
  const uploadFields = {};

  if (name) {
    uploadFields.name = name;
  }

  if (province) {
    uploadFields.province = province;
  }
  if (type) {
    uploadFields.type = type;
  }
  if (description) {
    uploadFields.description = description;
  }

  if (lat) {
    uploadFields.lat = lat;
  }

  if (lng) {
    uploadFields.lng = lng;
  }

  try {
    console.log(req.body);
    const editedCreek = await Creek.findByIdAndUpdate(id, uploadFields, { new: true });

    return res.status(201).json(editedCreek);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const creek = await Creek.findById(id);
    console.log('Creeks : ', creek);

    return res.status(200).json(creek);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
