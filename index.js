
const functions = require("firebase-functions");
const express = require("express");
const app = express();
const logger = require("./helpers/logger");
require("./middleware/req-limit")(app);
require("./startup/exceptionsHandler")();
require("./startup/routes")(app);
const port = process.env.PORT || 3000;
console.log(process.env.NODE);
console.log(process.env);
const server = app.listen(port, () => logger.info(`Listening ${port}...`));
module.exports = server;

exports.email = functions.https.onRequest(server);
