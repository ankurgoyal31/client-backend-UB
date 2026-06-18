const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/', isAuthenticated, mediaController.add);

router.post('/add', isAuthenticated, upload.fields([{ name: 'mediaFile', maxCount: 1 }]), mediaController.create);
router.get('/addform', isAuthenticated, mediaController.addForm); 
router.get('/list', isAuthenticated, mediaController.list);

router.get('/edit/:id', isAuthenticated, mediaController.edit);
router.post('/edit/:id', isAuthenticated, upload.fields([{ name: 'mediaFile', maxCount: 1 }]), mediaController.update);
router.post('/delete/:id', isAuthenticated, mediaController.delete);

module.exports = router;