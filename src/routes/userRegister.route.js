const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller.js');

router.post('/users/register', usersController.create);

module.exports = router;