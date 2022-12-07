const db = require("../config/mysql.config");
class PurchaseRepository {
  findAll() {
    return db.execQuery(` 
        select c.name as cliente,b.title as livro,p.quantity, date_format(p.createdAt,'%d-%m-%Y') as dt_compra 
        from Purchase p 
        join Customer c on c.id = p.customerId 
        join Book b on b.id = p.bookId
        order by c.name ;
        `);
  }

  findOneByid(id) {
    return db.execQuery(`
        select c.name as cliente,b.title as livro,p.quantity, date_format(p.createdAt,'%d-%m-%Y') as dt_compra 
        from Purchase p 
        join Customer c on c.id = p.customerId 
        join Book b on b.id = p.bookId
        where p.id = ${id};
        `);
  }

  async create(data) {
    const { customerId, bookId, quantity } = data;
    return await db.execQuery(`
        INSERT INTO Purchase 
            (
                customerId,
                bookId,
                quantity
                ) 
        values 
        (
            '${customerId}',
            '${bookId}',
            '${quantity}'
        );
        `);
  }

  dashBoardSalePerCustomer(id_customer) {
    return db.execQuery(`
        select c.name as cliente,b.title as livro,p.quantity, date_format(p.createdAt,'%d-%m-%Y') as dt_compra 
        from Purchase p 
        join Customer c on c.id = p.customerId 
        join Book b on b.id = p.bookId
        where p.customerId =  ${id_customer}; 
        `);
  }
}

module.exports = { PurchaseRepository };
