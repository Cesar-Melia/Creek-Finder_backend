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
    user.password = null;
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const userGetLogged = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).populate('comments');

    user.password = null;

    return res.status(200).json(user);
  } catch (error) {
    console.log('usuario: ', req.user);
    return next(error);
  }
};

const userEdit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userName, password, email, img, role } = req.body;

    const user = {};

    userName && (user.userName = userName);
    email && (user.email = email);
    password && (user.password = password);
    img && (user.img = img);
    role && (user.role = role);

    const editedUser = await User.findByIdAndUpdate(id, user, { new: true });

    editedUser.password = null;

    return res.status(201).json(editedUser);
  } catch (error) {
    return next(error);
  }
};

const userEditLogged = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { userName } = req.body;
    console.log('campos: ', _id, userName);

    console.log('image: ', req.fileUrl);

    const img = req.fileUrl ? req.fileUrl : '';

    const user = { userName, img };

    const editedUser = await User.findByIdAndUpdate(_id, user, { new: true });

    editedUser.password = null;

    return res.status(201).json(editedUser);
  } catch (error) {
    return next(error);
  }
};

const userAddFavorite = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { creekId } = req.params;

    const user = await User.findById(_id);

    if (!user.favorites.includes(creekId)) {
      await User.findByIdAndUpdate(
        _id,
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
    }

    return res.status(201).json('Cala añadida a favoritos');
  } catch (error) {
    return next(error);
  }
};

const userDeleteFavorite = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { creekId } = req.params;

    const user = await User.findById(_id);

    if (user.favorites.includes(creekId)) {
      await User.findByIdAndUpdate(
        _id,
        {
          $pull: { favorites: creekId },
        },
        { new: true }
      );

      await Creek.findByIdAndUpdate(
        creekId,
        {
          $inc: { timesFav: -1 },
        },
        { new: true }
      );
    }

    return res.status(201).json('Cala eliminada de favoritos');
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
      response = 'Usuario Borrado';
    } else {
      response = 'Usuario no encontrado';
    }

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  userGet,
  userGetById,
  userGetLogged,
  userEdit,
  userAddFavorite,
  userDeleteFavorite,
  userDelete,
  userEditLogged,
};
