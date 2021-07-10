const express = require('express');
const {
  commentsGet,
  commentsGetId,
  createCommentPost,
  deleteComment,
} = require('../controllers/comments.controller');
const { isAdmin, isAuth } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', commentsGet);

router.post('/create/:creekId', isAuth, createCommentPost);

router.delete('/delete/:commentId', isAdmin, deleteComment);

router.get('/:creekId', commentsGetId);
module.exports = router;
