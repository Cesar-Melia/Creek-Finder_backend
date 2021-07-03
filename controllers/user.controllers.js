const User = require('../models/User');

const userGet = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return next(error);
  }
};

const userGetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const userEdit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userName, password, email } = req.body;
    const user = { userName, password, email };
    const editedUser = await User.findByIdAndUpdate(id, user, { new: true });

    return res.status(201).json(editedUser);
  } catch (error) {
    return next(error);
  }
};

const userDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    let response = '';

    if (deletedUser) {
      response = 'user deleted';
    } else {
      response = 'user not found';
    }

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = { userGet, userGetById, userEdit, userDelete };
