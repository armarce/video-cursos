const { Router } = require('express');
const router = Router();
const categoriesController = require('../Controllers/categories.controller.js');

router.get('/categories/', categoriesController.getAll);
router.post('/categories/', categoriesController.create);
router.put('/categories/:category_id', categoriesController.update);
router.delete('/categories/:category_id', categoriesController.delete);

module.exports = router;