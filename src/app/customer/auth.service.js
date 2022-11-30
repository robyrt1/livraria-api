const { BcryptShared } = require("../../shared/bcrypt.shared");
const { JwtShared } = require("../../shared/jwt.shared");
const { CustomerService } = require("./customer.service");

class AuthService {
  constructor() {
    this.customerService = new CustomerService();
    this.bcryptShared = new BcryptShared();
    this.jwtShared = new JwtShared();
  }

  verifyJWTToken(token) {
    return this.jwtShared.verify(token);
  }

  validate(body) {
    const { email, password: passwordFromRequest } = body;
    const { data: user } = this.customerService.findOneByEmail(email);

    if (!user) {
      throw {
        status: false,
        message: `customer with the following email ${email} is not exists`,
        dados: null,
      };
    }


  }
}
