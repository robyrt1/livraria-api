// const db = require("../../config/mysql.config");
const dayjs = require("dayjs");
const {
  CustomerRepository,
} = require("../../repositories/Customer.repository");

const {
  OK,
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  NOT_FOUND,
} = require("../../shared/constants/http.codes");

const { JoiValidator } = require("../../shared/validators/joi.validator");
// const CreateValidatorSchema = require("../../shared/validators/customer/create.validator.shema"); 
const {
  CpfCnpjValidator,
} = require("../../shared/validators/user/cpf.cnpj.validator");
const {
  HttpClientShared,
} = require("../../shared/validators/customer/http.Client.shared");
const { BcryptShared } = require("../../shared/bcrypt.shared");

class CustomerService {
  constructor() {
    this.customerRepository = new CustomerRepository();
    this.joiValidator = new JoiValidator();
    this.cpfCnpjValidator = new CpfCnpjValidator();
    this.httpClientShared = new HttpClientShared();
    this.bcryptShared = new BcryptShared();
  }

  findAll() {
    try {
      const result = this.customerRepository.findAll();
      return {
        statusCode: OK,
        message: "Sucesso ao fazer a requisição",
        data: result,
      };
    } catch (err) {
      return { statusCode: INTERNAL_SERVER_ERROR, err };
    }
  }

  findOneByid(id) {
    try {
      const result = this.customerRepository.findOneById(id);
      return {
        statusCode: OK,
        message: "Sucesso ao fazer a requisição",
        data: result,
      };
    } catch (err) {
      return { statusCode: INTERNAL_SERVER_ERROR, err };
    }
  }

  findOneByEmail({ email }) {
    try {
      const result = this.customerRepository.findOneByEmail(email);
      return {
        statusCode: OK,
        message: "Email buscado com sucesso.",
        dados: result,
      };
    } catch (err) {
      return { statusCode: INTERNAL_SERVER_ERROR, err };
    }
  }

  async create(body) {
    //validate cpf/cnpj
    const cpfCnpj = this.cpfCnpjValidator
      .isValidate(body.cpfcnpj)
      .then((data) => {
        return data != true ? { status: false } : { status: true };
      });

    if ((await cpfCnpj).status === false) {
      return {
        statusCode: BAD_REQUEST,
        message: "CPF/CNPJ invalid",
        dados: null,
      };
    }
    //validate cep
    const cepvalidate = await this.httpClientShared.request(body.cep);

    if (Object.hasOwn(cepvalidate, "erro")) {
      return { statusCode: BAD_REQUEST, message: "Cep invalid", dados: null };
    }
    //operação
    try {
      const passwordHash = this.bcryptShared.hash(body.password);
      const result = await this.customerRepository.create(body, passwordHash);
      // const data = result.affectedRows > 0 ? "inserted" : "was not inserted";
      return {
        statusCode: CREATED,
        message: "Sucesso ao fazer a requisição",
        dados: result.affectedRows > 0 ? "inserted" : "was not inserted",
      };
    } catch (err) {
      throw {
        statusCode: INTERNAL_SERVER_ERROR,
        message: "falha ao fazer a requisição",
        dados: err,
      };
    }
  }

  updateByid(id, data) {
    try {
      this.customerRepository.updateById(id, data);
      return { statusCode: NO_CONTENT, message: "Sucesso ao atualizar dado" };
    } catch (err) {
      throw {
        statusCode: INTERNAL_SERVER_ERROR,
        message: "Falha ao atualizar dado",
        err,
      };
    }
  }

  removeById(id) {
    try {
      this.customerRepository.removeById(id);
      return {
        statusCode: NO_CONTENT,
        message: "sucesso ao fazer a requisição",
      };
    } catch (err) {
      throw {
        statusCode: INTERNAL_SERVER_ERROR,
        message: "falha ao fazer a requisição",
        err,
      };
    }
  }
}
module.exports = { CustomerService };
