const {Router} = require('express');
const router = Router();
const videosController = require('../controllers/videos.controller.js')


router.get('/videos', videosController.getAll);
router.post('/videos', videosController.create);
router.delete('/videos/:video_id', videosController.delete);


module.exports = router;