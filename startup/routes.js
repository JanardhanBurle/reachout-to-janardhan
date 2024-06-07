const express = require("express");
const mail = require("../routes/mail");
const cybergoat = require("../routes/cybergoat");
const error = require("../middleware/error");
const cors = require("cors");
const whitelist = ["https://janardhan-portfolio.web.app/", "janardhan-portfolio.web.app"];
const corsOpts = {
  origin: function(origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  methods: [
    "GET",
    "POST",
  ],

  allowedHeaders: [
    "Content-Type",
  ],
};

module.exports = function(app) {
  app.use(cors(corsOpts));

  app.use(express.json());
  app.use("/api/mail", mail);
  app.use("/api/cybergoat", cybergoat);
  app.use(error);
};
