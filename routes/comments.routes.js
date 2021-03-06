const express = require('express');
const { commentsGet, commentsGetId, createCommentPost, deleteComment } = require('../controllers/comments.controllers');
const { isAdmin, isAuth } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', isAdmin, commentsGet);

router.post('/create/:creekId', isAuth, createCommentPost);

router.delete('/delete/:commentId', isAdmin, deleteComment);

router.get('/:creekId', commentsGetId);
module.exports = router;
