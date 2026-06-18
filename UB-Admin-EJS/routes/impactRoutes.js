const express = require("express")
const router = express.Router();
const impactController = require('../controllers/impactController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get("/",isAuthenticated,impactController.list);
router.get("/addform",isAuthenticated,impactController.addForm);
router.post("/add_data",isAuthenticated,upload.any(),impactController.add_data);
router.get("/editform/:id",isAuthenticated,impactController.editForm);
router.post("/edit/:id",isAuthenticated,upload.any(),impactController.edit);
router.delete("/delete/:id",isAuthenticated,impactController.delete);
module.exports = router; 