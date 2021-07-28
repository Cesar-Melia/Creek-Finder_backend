const express = require('express');
const {
  commentsGet,
  commentsGetId,
  createCommentPost,
  deleteComment,
} = require('../controllers/comments.controllers');
const { isAdmin, isAuth } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', commentsGet); //isAdmin

router.post('/create/:creekId', createCommentPost); //isAuth

router.delete('/delete/:commentId', deleteComment); //isAdmin

router.get('/:creekId', commentsGetId);
module.exports = router;