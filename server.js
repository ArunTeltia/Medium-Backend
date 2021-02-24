const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const models = require("./models");
const app = express();

app.use(
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  (req, res, next) => {
    req.models = models;
    next();
  }
);

mongoose.connect(`${process.env.MONGO_URI}`, (err) => console.error(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => console.log(err || `listening on localhost:${PORT}`));
