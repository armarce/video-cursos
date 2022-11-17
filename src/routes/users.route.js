const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller.js');

router.get('/users/', usersController.getAll);

router.get('/users/:user_id/courses', usersController.getCoursesByUser);

router.get('/users/:user_id', usersController.getOne);

router.patch('/users/:user_id', usersController.updatePartial);

router.delete('/users/:user_id', usersController.delete);

module.exports = router;