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
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
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

// const db = new MysqlConfig();
// const result  = db.execQuery('select * from User')
// console.log(result)
// const dotenv = require('dotenv');
// dotenv.config({
//     path: `env-files/.config.${process.env.NODE_ENV || "dev"}.env`,
//   });
// const db =new Mysql({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     port: process.env.MYSQL_PORT,
//     dateStrings: true,
//   });
//   console.log(
//     "[INFO] - Database is connected: ",
//     db
//   );

// console.log('[INFO] - Database is connected',!!db)

// const result = db.query(`select * from User`)
// console.log(result)
