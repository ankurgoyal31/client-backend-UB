const express = require('express');
const router = express.Router();
const contactApiController = require('../../controllers/api/contactApiController');

router.post('/', contactApiController.create);

module.exports = router;