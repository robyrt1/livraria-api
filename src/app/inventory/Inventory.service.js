const {
  OK,
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  NOT_FOUND,
} = require("../../shared/constants/http.codes");
const db = require("../../config/mysql.config");

class InventoryService {
  constructor() {}

  findAll() {
    const result = db.execQuery("select book_id,quantity from Inventory");
    console.log(result);
    return { statusCode: OK, data: result };
  }

  findOneByid(book_id) {
    const result = db.execQuery(
      `select book_id,quantity from Book where book_id = ${book_id}`
    );
    return { statusCode: OK, data: result };
  }

  async create(body) {
    const result = await db.execQuery(
      `INSERT INTO Inventory (book_id,quantity)  values ('${body.book_id}','${body.quantity}');`
    );
    const data = result?.affecRows < 0 ? "inserted" : "was not inserted";
    return { statusCode: CREATED, data };
  }
}

module.exports = { InventoryService };
