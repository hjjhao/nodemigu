const express = require("express");
const dotenv = require("dotenv").config().parsed;
const controllers = require("./controllers");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const formData = require("express-form-data");
const os = require("os");
const middleWare = require("./middleware");
const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));

const mws = Object.keys(middleWare);
mws.forEach(key => app.use(middleWare[key]));

// Health Check Purpose
app.all("/", (req, res) => {
  return res.status(200).send("Server is running.");
});

controllers.forEach(controller => {
  app.use(controller.path, controller.route);
});
app.listen(process.env.PORT || 3300, () => {
  console.log(`Server is running on ${process.env.PORT || 3300}.`);
});
