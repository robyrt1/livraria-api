const {
  OK,
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  NOT_FOUND,
} = require("../../shared/constants/http.codes");
const dayjs = require("dayjs");
const { JoiValidator } = require("../../shared/validators/joi.validator");
const db = require("../../config/mysql.config");

class BookService {
  constructor() {
    this.joiValidator = new JoiValidator();
  }

  findAll() {
    try {
      const result = db.execQuery("select * from Book");
      return {
        status: true,
        message: "Sucesso ao fazer a requisição",
        dados: result,
      };
    } catch (err) {
      console.error("[ERROR] => ", err);
      throw {
        status: false,
        message: "Ocorreu um erro ao fazer a requisição",
        dados: null,
      };
    }
  }

  findOneByid(id) {
    const result = db.execQuery(`select * from Book where id = ${id}`);
    return { statusCode: OK, data: result };
  }

  findOneByBarcode(barcode) {
    const result = db.execQuery(
      `select * from Book where barcode = ${barcode}`
    );
    return { statusCode: OK, data: result };
  }

  findOneByEmail(email) {
    try {
      const result = db.execQuery(
        `select * from Book where id = ${body.email}`
      );
      return {
        status: true,
        message: "Sucesso ao fazer a requisição",
        data: result,
      };
    } catch (err) {
      console.error("[ERROR] => ", err);
      throw {
        status: false,
        message: "Ocorreu um erro ao fazer a requisição",
        dados: null,
      };
    }
  }

  create(body) {
    try {
      const code = Math.floor(Math.random() * 9999999999999);
      body.barcode = `${code}`;
      const result = db.execQuery(
        `INSERT INTO Book 
        (
          publishId,
          genreId,
          title,
          author,
          barcode,
          price,
          createdAt)  
        values 
        (
          '${body.publishId}',
          '${body.genreId}',
          '${body.title}',
          '${body.author}',
          '${body.barcode}',
          '${body.price}',
          '${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}');`
      );

      const data = result?.affecRows < 0 ? "was not inserted" : "inserted";
      return {
        status: true,
        message: "Sucesso ao fazer a requisição",
        dados: data,
      };
    } catch (err) {
      console.error("[ERROR] => ", err);
      throw {
        status: false,
        message: "Ocorreu um erro ao fazer a requisição",
        dados: null,
      };
    }
  }
}

module.exports = { BookService };
