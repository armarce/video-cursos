const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller.js');

router.post('/courses/', coursesController.create);

router.get('/courses/', coursesController.getAll);

router.get('/courses/:course_id', coursesController.getOne);

router.patch('/courses/:course_id', coursesController.updatePartial);

router.delete('/courses/:course_id', coursesController.delete);

module.exports = router;