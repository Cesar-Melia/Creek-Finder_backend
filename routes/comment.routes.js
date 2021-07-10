const express = require('express');
const {
  commentsGet,
  commentsGetId,
  createCommentPost,
  deleteComment,
} = require('../controllers/comments.controller');
const { isAdmin, isAuth } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', isAdmin, commentsGet);

router.post('/create/:creekId', createCommentPost); //isAuth

router.delete('/delete/:commentId', deleteComment); //isAdmin

router.get('/:creekId', commentsGetId);
module.exports = router;
