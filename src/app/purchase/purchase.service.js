const {
  OK,
  CREATED,
  INTERNAL_SERVER_ERROR,
} = require("../../shared/constants/http.codes");
const {
  PurchaseRepository,
} = require("../../repositories/purchase.repository");
class PurchaseService {
  constructor() {
    this.purchaseRepository = new PurchaseRepository();
  }

  findAll() {
    try {
      const result = this.purchaseRepository.findAll();
      return { statusCode: OK, data: result };
    } catch (err) {
      throw { sattusCode: INTERNAL_SERVER_ERROR, err}
    }
  }

  findOneByid(id) {
  try {
      const result = this.purchaseRepository.findOneByid(id);
      return { statusCode: OK, data: result };
  } catch (err) {
    throw { sattusCode: INTERNAL_SERVER_ERROR, err}
  }
  }

  async create(body) {
    try {
      const result = await this.purchaseRepository.create(body);
      const data = result?.affecRows < 0 ? "inserted" : "was not inserted";

      return { statusCode: CREATED, data };
    } catch (err) {
      throw { sattusCode: INTERNAL_SERVER_ERROR, err}
    }
  }

  dashBoardSalePerCustomer(id_customer) {
    try {
      const result =
        this.purchaseRepository.dashBoardSalePerCustomer(id_customer);
      return { statusCode: OK, data: result };
    } catch (err) {
      throw { sattusCode: INTERNAL_SERVER_ERROR, err}
    }
  }
}
module.exports = { PurchaseService };
