const express = require("express")
const router = express.Router();
const popupController = require('../controllers/popupController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get("/",isAuthenticated,popupController.addForm);
router.post("/add",isAuthenticated,upload.any(),popupController.add);
router.get("/editform",isAuthenticated,popupController.editform);
router.post("/edit/:id",isAuthenticated,upload.any(),popupController.edit);
router.post("/delete",isAuthenticated,popupController.delete)

module.exports = router; 
