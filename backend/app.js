const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

const PORT = 5000;

app.use(bodyParser.json());

app.use(cors());

//user: Drew password: bella
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Couldn't find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const mongoURI =
  "mongodb+srv://Drew:bella@cluster0.dcc6h.mongodb.net/Apartment-App?retryWrites=true&w=majority";

const mongoConnection = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error: " + err);
  }
};

mongoConnection();

app.listen(PORT, () => {
  console.log(`App is connected on port ${PORT}`);
});
