const express = require('express');
const router = express.Router();
const projectApiController = require('../../controllers/api/projectApiController');

router.get('/', projectApiController.getAll);

/* IMPORTANT: slug route must be last */
router.get('/:slug', projectApiController.getOne);

module.exports = router;
