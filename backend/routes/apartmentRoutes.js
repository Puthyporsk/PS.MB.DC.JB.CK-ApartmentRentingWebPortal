const express = require("express");

const router = express.Router();
const apartmentController = require("../controllers/apartmentController");

router.post("/addApartment", apartmentController.addApartment);

router.get("/getAll", apartmentController.getAllApartments);
router.get("/getByID/:a_id", apartmentController.getByID);

module.exports = router;
