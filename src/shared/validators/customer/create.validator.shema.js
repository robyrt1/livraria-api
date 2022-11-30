const defautJoi = require("@hapi/joi");
const joiDate = require("@joi/date");
const joi = defautJoi.extend(joiDate);

const CreateValidatorSchema = joi.object().keys({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    cpfCnpj: joi.string().required(),
    road: joi.string().required(),
    district: joi.string().required(),
    cep: joi.string().required(),
    password: joi.string().required()
})



module.exports = { CreateValidatorSchema }