const User = require('../models/User');
const Creek = require('../models/Creek');

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

const userAddFavorite = async (req, res, next) => {
  try {
    const { userId } = req.user._id;
    const { creekId } = req.params;

    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { favorites: creekId },
      },
      { new: true }
    );

    await Creek.findByIdAndUpdate(
      creekId,
      {
        $inc: { timesFav: 1 },
      },
      { new: true }
    );

    return res.status(201).json('Cala añadida a favoritos');
  } catch (error) {
    return next(error);
  }
};

const userDeleteFavorite = async (req, res, next) => {
  try {
    const { userId } = req.user._id;
    const { creekId } = req.params;

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { favorites: { $eq: creekId } },
      },
      { new: true }
    );

    await Creek.findByIdAndUpdate(
      creekId,
      {
        $inc: { $sum: -1 },
      },
      { new: true }
    );

    return res.status(201).json('Cala añadida a favoritos');
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

module.exports = { userGet, userGetById, userEdit, userAddFavorite, userDeleteFavorite, userDelete };
