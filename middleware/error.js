const logger = require("../helpers/logger");

module.exports = function(error, req, res, next) {
  logger.error(error.message, error);
  res.status(500).send(error.message);
};
