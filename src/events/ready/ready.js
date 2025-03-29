const logger = require("../../util/client/logger");

const mongoURL = process.env.mongoURL;

module.exports = async (client) => {
  await logger.info(`${client.user.tag} has come online!`);
};
