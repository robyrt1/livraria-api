const { EnvironmentShared } = require("./environment.shared");
const jwt = require("jsonwebtoken");
const { INTERNAL_SERVER_ERROR } = require("./constants/http.codes");


class JwtShared
 {
  constructor() {
    this.environmentShared = new EnvironmentShared();
  }

  genereted(data) {
    try {
      const expireIn = this.environmentShared.getEnv("JWT_EXPIRES_IN");
      const secret = this.environmentShared.getEnv("JWT_SECRET");
      return jwt.sign(data, secret, { expireIn });
    } catch (err) {
      throw { 
        statusCode: INTERNAL_SERVER_ERROR,
        err,
      };
    }
  }

  verify(token) {
    let result;
    try{
      const secret = this.environmentShared.getEnv("JWT_SECRET");
      const decoded = jwt.verify(token, secret);

      result = {isValidToken:true , data: decoded}
    }catch(err){
      result = {isValidToken:false , err}
    }
    return result;
    }
}

module.exports = { JwtShared }