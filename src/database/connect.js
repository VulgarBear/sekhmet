const mongoose = require("mongoose");
const logger = require("../util/client/logger");

module.exports = async () => {
  mongoose.set("strictQuery", false);

  logger.info("Database >> MongoDB is connecting...");

  try {
    await mongoose.connect(process.env.mongoURL);
    logger.info("Database >> MongoDB is ready!");
  } catch (err) {
    logger.error("Database >> Failed to connect to MongoDB!");
    logger.error(err);
    logger.info("Exiting...");
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    logger.error("Database >> Failed to connect to MongoDB!");
    logger.error(err);
    logger.info("Exiting...");
    process.exit(1);
  });

  return;
};
