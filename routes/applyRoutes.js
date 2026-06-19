const express = require("express")
const router = express.Router();
const applyController = require('../controllers/applyController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
  
router.get("/",isAuthenticated,applyController.list);
router.delete("/delete/:id",isAuthenticated,applyController.delete);

module.exports = router
