const logger = require("../../util/client/logger");

module.exports = (client) => {
  logger.info(`${client.user.tag} has come online!`);
};
