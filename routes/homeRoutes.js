const express = require("express")
const router = express.Router();
const homeController = require('../controllers/homeController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get("/",isAuthenticated,homeController.list);
router.get("/addform",isAuthenticated,homeController.addForm);
router.post("/add",isAuthenticated,upload.any(),homeController.add);
router.get("/editform/:id",isAuthenticated,homeController.editForm);
router.post("/edit/:id",isAuthenticated,upload.any(),homeController.edit);
router.delete("/delete/:id",isAuthenticated,homeController.delete);
module.exports = router;   