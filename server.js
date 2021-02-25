require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const models = require("./models");
const { UsersController, TokensController } = require("./controllers");

const app = express();

app.use(
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  (req, res, next) => {
    req.models = models;
    next();
  }
);

app.use("/users", UsersController);
app.use("/tokens", TokensController);

mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(process.env.MONGO_URI, (err) =>
  console.log(err || "connected to mongo")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => console.log(err || `listening on localhost:${PORT}`));
