const Creek = require('../models/Creek');

const creekGet = async (req, res, next) => {
  try {
    const creeks = await Creek.find().populate('comments');

    return res.status(200).json(creeks);
  } catch (error) {
    return next(error);
  }
};

const createCreek = async (req, res, next) => {
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
};

const deleteCreek = async (req, res, next) => {
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
};

const creekEdit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, province, type, description, lat, lng } = req.body;
    const uploadFields = {};

    name && (uploadFields.name = name);
    province && (uploadFields.province = province);
    type && (uploadFields.type = type);
    description && (uploadFields.description = description);
    lat && (uploadFields.lat = lat);
    lng && (uploadFields.lng = lng);

    const editedCreek = await Creek.findByIdAndUpdate(id, uploadFields, { new: true });

    return res.status(201).json(editedCreek);
  } catch (error) {
    return next(error);
  }
};

const creekGetById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const creek = await Creek.findById(id).populate('comments');
    console.log('Creeks : ', creek);

    return res.status(200).json(creek);
  } catch (error) {
    return next(error);
  }
};

module.exports = { creekGet, createCreek, deleteCreek, creekEdit, creekGetById };
