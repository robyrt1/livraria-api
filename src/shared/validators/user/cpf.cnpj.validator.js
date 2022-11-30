const { cnpj, cpf } = require("cpf-cnpj-validator");

class CpfCnpjValidator {
  isValidate(text) {
    return new Promise((resolve, reject) => {
      if (text?.length <= 14) {
        resolve(cpf.isValid(text));
      }
      resolve(cnpj.isValid(text));
    });
  }
}

module.exports = { CpfCnpjValidator };

// const test = new CpfCnpjValidator();

// test.isValidate("703.717.472-60").then(console.log);

// async isValidate(text) {
//   if (text?.length <= 14) {
//     const result = cpf.isValid(text);
//     return result;
//   }
//   return cnpj.isValid(text);
// }




























// this.cpfCnpjValidator.isValidate(body.cpfCnpj).then((data) => {
//   if (!data) {
//     return { status: false, message: "CPF/CNPJ invalid", dados: null };
//   }
// }).catch(err=>{
//   return { status: false, message: "INTERNAL_SERVER_ERROR", dados: err };
// })
