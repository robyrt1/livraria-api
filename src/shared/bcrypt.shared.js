const { BCRYPT_SALT_ROUNDS } = require("./constants/auth");
const bcrypt = require("bcrypt");
class BcryptShared {
  compare(passaworFromRequest, passwordHash) {
    try {
      return bcrypt.compare(passaworFromRequest, passwordHash);
    } catch (error) {
      throw { statuscode: "", error };
    }
  }

  hash(data) {
    try {
      return bcrypt.hashSync(data, BCRYPT_SALT_ROUNDS);
    } catch (error) {
      throw { statuscode: "", error };
    }
  }
}
module.exports = { BcryptShared };
