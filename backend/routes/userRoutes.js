const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/saveApartment", userController.saveApartment);
router.post("/getUserApartments", userController.getUserApartments);
router.post("/deleteUserApartment", userController.deleteUserApartment);

module.exports = router;
