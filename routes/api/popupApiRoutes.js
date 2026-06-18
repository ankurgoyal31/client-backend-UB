const express = require('express');
const router = express.Router();
const popupApiController = require('../../controllers/api/popupApiController');

router.get('/', popupApiController.getPopup);
module.exports = router;
