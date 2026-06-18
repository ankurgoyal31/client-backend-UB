const express = require("express")
const router = express.Router();
 const valueController = require('../controllers/valueController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
   
router.get("/",isAuthenticated,valueController.list)
router.get("/add",isAuthenticated,valueController.addForm)
router.post("/add_data",isAuthenticated,upload.any(),valueController.add_data);
router.post("/edit/:id",isAuthenticated,upload.any(),valueController.edit)
router.get("/editform/:id",isAuthenticated,valueController.editForm)
module.exports = router;    