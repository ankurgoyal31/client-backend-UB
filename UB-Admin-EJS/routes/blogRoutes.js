const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, blogController.list);
router.get('/add', isAuthenticated, blogController.addForm);
router.post('/add', isAuthenticated, blogController.create);
router.get('/edit/:id', isAuthenticated, blogController.editForm);
router.put('/edit/:id', isAuthenticated, blogController.update);
router.delete('/delete/:id', isAuthenticated, blogController.delete);

module.exports = router;
