const { ExpressConfig } = require("./config/express.config");
const { EnvironmentShared } = require("./shared/environment.shared");
require("./config/mysql.config");

const expressConfig = new ExpressConfig();
const environmentShared = new EnvironmentShared();
const serverPort = environmentShared.getEnv("SERVER_PORT");

expressConfig.getServer().listen(serverPort, () => {
  console.log(`[INFO] - server is up running on port ${serverPort}`);
});

     