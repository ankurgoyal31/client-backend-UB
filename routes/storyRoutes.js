const express = require("express")
const router = express.Router();
const storyController = require('../controllers/storyController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
  
router.get("/",isAuthenticated,storyController.list);
router.get("/addform",isAuthenticated,storyController.addForm);
router.post("/add",isAuthenticated,upload.any(),storyController.add);
router.get("/editform/:id",isAuthenticated,storyController.editForm);
router.post("/edit/:id",isAuthenticated,upload.any(),storyController.edit);
router.delete("/delete/:id",isAuthenticated,storyController.delete);
module.exports = router; 