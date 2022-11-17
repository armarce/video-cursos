const { Router } = require('express');
const usersCoursesController = require('../controllers/usersCourses.controller.js');

const router = Router();

router.get('/users/courses', usersCoursesController.getAll);
router.post('/users/courses', usersCoursesController.create);
//router.delete('/usersCourses', usersCoursesController.delete);

module.exports = router;