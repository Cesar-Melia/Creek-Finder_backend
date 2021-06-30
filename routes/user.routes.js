const { response } = require('express');
const express = require('express');
const router = express.Router();
const { userGet, userGetById, userEdit, userDelete } = require('../controllers/user.controllers');

router.get('/', userGet);

router.get('/:id', userGetById);

router.put('/edit/:id', userEdit);

router.delete('/delete/:id', userDelete);

module.exports = router;
