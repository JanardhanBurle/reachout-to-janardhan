const bodyParser = require("body-parser");
const express = require("express");

module.exports = function(app) {
  app.use(bodyParser.json({
    limit: "50mb",
  }));
  app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  }));
  app.use(express.json({
    limit: "50mb",
  }));
};
