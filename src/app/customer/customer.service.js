const db = require("../../config/mysql.config");
const dayjs = require("dayjs")

const { JoiValidator } = require("../../shared/validators/joi.validator");
const CreateValidatorSchema = require("../../shared/validators/customer/create.validator.shema");
const {
  CpfCnpjValidator,
} = require("../../shared/validators/user/cpf.cnpj.validator");
const {
  HttpClientShared,
} = require("../../shared/validators/customer/http.Client.shared");
const { BcryptShared } = require("../../shared/bcrypt.shared");

class CustomerService {
  constructor() {
    this.joiValidator = new JoiValidator();
    this.cpfCnpjValidator = new CpfCnpjValidator();
    this.httpClientShared = new HttpClientShared();
    this.bcryptShared = new BcryptShared();
  }

  findAll() {
    const result = db.execQuery("select * from Customer");
    return {
      status: true,
      message: "Sucesso ao fazer a requisição",
      data: result,
    };
  }

  findOneByid(id) {
    const result = db.execQuery(`select * from Customer where id = ${id}`);

    return {
      status: true,
      message: "Sucesso ao fazer a requisição",
      data: result,
    };
  }

  findOneByEmail({ email }) {
    const result = db.execQuery(
      `select * from Customer where email = '${email}'`
    );
    return {
      status: true,
      message: "Email buscado com sucesso.",
      dados: result,
    };
  }

  async create(body) {
    //validate cpf/cnpj
    const cpfCnpj = this.cpfCnpjValidator
      .isValidate(body.cpfcnpj)
      .then((data) => {
        return data != true ? { status: false } : { status: true };
      });

    if ((await cpfCnpj).status === false) {
      return { status: false, message: "CPF/CNPJ invalid", dados: null };
    }
    //validate cep
    const cepvalidate = await this.httpClientShared.request(body.cep);

    if (Object.hasOwn(cepvalidate, "erro")) {
      return { status: false, message: "Cep invalid", dados: null };
    }
    //operação
    try {
      const passwordHash = this.bcryptShared.hash(body.password);
      const result = await db.execQuery(
        `
        INSERT INTO Customer (name,phone,cpfcnpj,road,district,email,password,cep)  
        values 
        ('${body.name}','${body.phone}','${body.cpfcnpj}','${body.road}',
         '${body.district}','${body.email}','${passwordHash}','${body.cep}');`
      );
      const data = result.affectedRows > 0 ? "inserted" : "was not inserted";
      return {
        status: true,
        message: "Sucesso ao fazer a requisição",
        dados: data,
      };
    } catch (err) {
      throw {
        status: false,
        message: "falha ao fazer a requisição",
        dados: err,
      };
    }
  }

  updateByid(id, data) {
    const customerFromDB = this.findOneByid(id);

    // console.log(!customerFromDB?.datavalue)
    // if (!customerFromDB) {
    //   throw {
    //     status: 400,
    //     message: "Customer alread exists",
    //     dados: null,
    //   };
    // }

    
    try {
      const updatedAt = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
      db.execQuery(` 
        update Customer 
        set 
        email = '${data.email}', 
        phone = '${data.phone}',
        road = '${data.road}',
        district='${data.district}',
        cep='${data.cep}', 
        updatedAt= '${updatedAt}'
        where id = ${id};
    `);
      return { status: 200, message: "Sucesso ao atualizar dado" };
    } catch (err) {
      throw { status: 500, message: "Falha ao atualizar dado", err };
    }
  }

  removeById(id) {
    try {
      db.execQuery(`
      update Customer set deletedAt = date(now()) where id = ${id};
    `);
      return { status: true, message: "sucesso ao fazer a requisição" };
    } catch (err) {
      throw {
        status: false,
        message: "falha ao fazer a requisição",
        err,
      };
    }
  }
}
module.exports = { CustomerService };
