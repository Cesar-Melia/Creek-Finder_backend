const express = require('express');
const Creek = require('../models/Creek');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const creeks = await Creek.find();
    console.log('Creeks : ', creeks);

    return res.status(200).json(creeks);
  } catch (error) {
    return next(error);
  }
});

//////////////////////////////////////////////////////////TODO
router.post('/create', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body);

    const { name, province, type, description, lat, lng } = req.body;

    // const image = req.fileUrl ? req.fileUrl : '';

    const newCreek = new Creek({
      name,
      province,
      type,
      description,
      comments,
      lat,
      lng,
    });

    const createdCreek = await newCreek.save();

    console.log(createdCreek);

    return res.status(201).json(createdCreek);
  } catch (error) {
    console.log(error);
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

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log('id: ', id);

    const deleted = await Creek.findByIdAndDelete(id);

    if (deleted) response = 'Creek deleted from db';
    else response = "Can't find a creek whit this id";

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
});
module.exports = router;
