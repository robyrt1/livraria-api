const {
  OK,
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  NOT_FOUND,
} = require("../../shared/constants/http.codes");
const db = require("../../config/mysql.config");
class PurchaseService {
  constructor() {}

   findAll() {
    const result =  db.execQuery("select * from Purchase");
    return { statusCode: OK, data: result };
  }

   findOneByid(id) {
    const result =  db.execQuery(`select * from Purchase where id = ${id}`);
    return { statusCode: OK, data: result };
  }

  async create(body) {
    try{
      const result = await db.execQuery(
        `INSERT INTO Purchase (customerId,bookId,quantity)  values ('${body.customerId}','${body.bookId}','${body.quantity}');`
      );
      const data = result?.affecRows < 0 ? "inserted" : "was not inserted";

      return { statusCode: CREATED, data };
    }catch(err){
      console.log(err);
    }
  }
};
module.exports = {PurchaseService}