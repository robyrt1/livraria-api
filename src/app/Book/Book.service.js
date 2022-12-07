const {
  OK,
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  NOT_FOUND,
} = require("../../shared/constants/http.codes");
const { JoiValidator } = require("../../shared/validators/joi.validator");
const { BookRepository } = require("../../repositories/book.repository");
class BookService {
  constructor() {
    this.joiValidator = new JoiValidator();
    this.bookRepository = new BookRepository();
  }

  findAll() {
    try {
      const result = this.bookRepository.findAll();
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
    const result = this.bookRepository.findOneById(id);
    return { statusCode: OK, data: result };
  }

  findOneByBarcode(barcode) {
    try {
      const result = this.bookRepository.findOneByBarcode(barcode);
      return { statusCode: OK, data: result };
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
      const result = this.bookRepository.create(body);

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
