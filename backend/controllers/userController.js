const HttpError = require("../models/HttpError");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const Apartment = require("../models/Apartment");

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError(
      "Invalid inputs passed, please check your data",
      422
    );
    return next(error);
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "A user with that email already exists, please signup with a different email",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up user failed, please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("A user with that email doesn't exist", 500);
    return next(error);
  }

  if (!user || user.password !== password) {
    const error = new HttpError(
      "Invalid login credentials, please try again",
      401
    );
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const saveApartment = async (req, res, next) => {
  const { uid, aid } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(uid);
  } catch (err) {
    const error = new HttpError(
      "An error ocurred with trying to find the user",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("A user with this ID doesn't exist", 500);
    return next(error);
  }

  let apartment;
  try {
    apartment = await Apartment.findById(aid);
  } catch (err) {
    const error = new HttpError(
      "An error ocurred with trying to find the apartment",
      500
    );
    return next(error);
  }

  if (!apartment) {
    const error = new HttpError(
      "An error ocurred with trying to find the apartment",
      500
    );
    return next(error);
  }

  let duplicate = false;
  // Check if user already has apartment saved
  existingUser.savedApartments.map((a) => {
    if (String(a._id) === String(apartment._id)) {
      duplicate = true;
    }
  });

  if (duplicate) {
    const error = new HttpError(
      "This apartment already exists in the users list",
      500
    );
    return next(error);
  }

  const apartmentObject = apartment.toObject();

  try {
    await existingUser.savedApartments.push(apartmentObject);
    await existingUser.save();
  } catch (err) {
    const error = new HttpError("The apartment was unable to be added", 500);
    return next(error);
  }

  res.status(201).json({ user: existingUser });
};

exports.saveApartment = saveApartment;
exports.signup = signup;
exports.login = login;
