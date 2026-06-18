const express = require("express")
const router = express.Router();
const careerController = require('../controllers/careerController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get("/",isAuthenticated,careerController.list);
router.get("/addform",isAuthenticated,careerController.addForm);
router.post("/add_data",isAuthenticated,upload.any(),careerController.add_data);

router.get("/editform/:id",isAuthenticated,careerController.editForm);
router.post("/edit_data/:id",isAuthenticated,upload.any(),careerController.edit_data);
router.delete("/delete/:id",isAuthenticated,careerController.delete_data);

module.exports = router;