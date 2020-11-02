const Apartment = require("../backend/models/Apartment.js");
const HttpError = require("../backend/models/HttpError");


const getAllApartments = async (req, res, next) => {
    let apartments;
    try {
        apartments = await Apartment.find({});
    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }

    res.json({ apartments: apartments });
};

exports.getAllApartments = getAllApartments;
