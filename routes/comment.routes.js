const express = require('express');
const { commentsGet, createCommentPost, deleteComment } = require('../controllers/comments.controller');
const { isAdmin, isAuth } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/:creekId', commentsGet);

router.post('/create/:creekId', isAuth, createCommentPost);

router.delete('/delete/:commentId', isAdmin, deleteComment);

module.exports = router;
