const { EnvironmentShared } = require("../shared/environment.shared");
const { INTERNAL_SERVER_ERROR } = require("../shared/constants/http.codes");
const Mysql = require("sync-mysql");
class MysqlConfig {
  constructor() {
    this.environmentShared = new EnvironmentShared();
    if (!MysqlConfig._instance) MysqlConfig._instance = this;

    this.connect();
    return this.getInstance();
  }

  getInstance() {
    return MysqlConfig._instance;
  }

  connect() {
    if (!this.getConnection()) {
      this.getInstance().connection = new Mysql({
        host: this.environmentShared.getEnv('MYSQL_HOST'),
        user: this.environmentShared.getEnv('MYSQL_USER'),
        password: this.environmentShared.getEnv('MYSQL_PASSWORD'),
        database: this.environmentShared.getEnv('MYSQL_DATABASE'),
        port: this.environmentShared.getEnv('MYSQL_PORT'),
        dateStrings: true,
      });
      console.log(
        "[INFO] - Database is connected: ",
        !!this.getInstance().connection
      );
    }
  }

  getConnection() {
    return this.getInstance().connection;
  }

execQuery(query) {
    try {
      const result = this.getConnection().query(query);
      return result;
    } catch (err) {
      throw { statusCode:INTERNAL_SERVER_ERROR, err };
    }
  }
}

module.exports = new MysqlConfig();


