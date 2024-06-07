const logger = require("../helpers/logger");
module.exports = function() {
  process.on("uncaughtException", (ex) => {
    logger.error(ex.meassage, ex);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    logger.error(ex.meassage, ex);
    process.exit(1);
  });
};
