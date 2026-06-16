const express = require('express');
const router = express.Router();
const blogApiController = require('../../controllers/api/blogApiController');

router.get('/', blogApiController.getAll);
router.get('/:id', blogApiController.getOne);
module.exports = router;
