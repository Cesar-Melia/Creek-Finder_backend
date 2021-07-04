const User = require('../models/User');
const Creek = require('../models/Creek');
const Comment = require('../models/Comment');

const commentsGet = async (req, res, next) => {
  try {
    const { creekId } = req.params;

    const comments = await Comment.find({ creek: creekId }).populate('user').populate('creek');

    return res.status(200).json(comments);
  } catch (error) {
    return next(error);
  }
};

const createCommentPost = async (req, res, next) => {
  try {
    const { creekId } = req.params;
    const { text } = req.body;
    const { _id } = req.user;

    const date = Date.now();

    const newComment = new Comment({
      creek: creekId,
      user: _id,
      text: text,
      date: date,
    });

    const createdComment = await newComment.save();

    await Creek.findByIdAndUpdate(
      creekId,
      {
        $addToSet: { comments: newComment },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      _id,
      {
        $addToSet: { comments: newComment },
      },
      { new: true }
    );

    return res.status(200).json(createdComment);
  } catch (error) {
    return next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    console.log(commentId);

    let response = '';

    const deleted = await Comment.findByIdAndDelete(commentId);

    console.log('deleted: ', deleted);

    console.log('creek: ', deleted.creek);
    console.log('User: ', deleted.user);

    await Creek.findByIdAndUpdate(
      deleted.creek,
      {
        $pull: { comments: commentId },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      deleted.user,
      {
        $pull: { comments: commentId },
      },
      { new: true }
    );

    if (deleted) response = 'Comment deleted from db';
    else response = "Can't find a comment whit this id";

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = { commentsGet, createCommentPost, deleteComment };
