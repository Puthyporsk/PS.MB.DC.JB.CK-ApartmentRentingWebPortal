const Apartment = require("../models/Apartment");
const HttpError = require("../models/HttpError");
const { validationResult } = require("express-validator");

const addApartment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError(
      "Invalid inputs passed, please check your data",
      422
    );
    return next(error);
  }

  const {
    mainImage,
    price,
    city,
    sqft,
    bedAmount,
    bathAmount,
    otherImages,
  } = req.body;

  const createdApartment = new Apartment({
    mainImage,
    price,
    city,
    sqft,
    bedAmount,
    bathAmount,
    otherImages,
  });
  try {
    await createdApartment.save();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res
    .status(201)
    .json({ apartment: createdApartment.toObject({ getters: true }) });
};

const getAllApartments = async (req, res, next) => {
  let apartments;
  try {
    apartments = await Apartment.find({});
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(201).json({ apartments: apartments });
};

const getByID = async (req, res, next) => {
  const id = req.params.a_id;
  let apartment;
  try {
    apartment = await Apartment.findById(id);
  } catch (err) {
    const error = new HttpError("Error.. the request didn't go through", 404);
    return next(error);
  }

  if (!apartment) {
    const error = new HttpError("Error.. the apartment doesn't exist", 500);
    return next(error);
  }

  res.json({ apartment: apartment.toObject({ getters: true }) });
};

exports.addApartment = addApartment;
exports.getAllApartments = getAllApartments;
exports.getByID = getByID;
