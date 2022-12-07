const db = require("../config/mysql.config");

class CustomerRepository {
  findAll() {
    return db.execQuery(`
            SELECT id,name,email,cpfcnpj,phone,road,district,cep FROM Customer;
        `);
  }

  findOneById(id) {
    return db.execQuery(`select id,name,email,cpfcnpj,phone,road,district,cep from Customer where id = ${id}`);
  }

  findOneByEmail(email) {
    return db.execQuery(`select * from Customer where email = '${email}'`);
  }
  async create(data, password) {
    return db.execQuery(
      `
            INSERT INTO 
                Customer 
                (
                    name,
                    phone,
                    cpfcnpj,
                    road,
                    district,
                    email,
                    password,
                    cep
                )  
            values 
            (
                '${data.name}',
                '${data.phone}',
                '${data.cpfcnpj}',
                '${data.road}',
                '${data.district}',
                '${data.email}',
                '${password}',
                '${data.cep}'
            );`
    );
  }

  updateById(id, data) {
    console.log("dataRepository => ", data);
    return db.execQuery(` 
        UPDATE 
            Customer 
        SET 
            email = '${data.email}', 
            phone = '${data.phone}',
            road = '${data.road}',
            district='${data.district}',
            cep='${data.cep}', 
            updatedAt= date(now())
        WHERE id = ${id};
    `);
  }

  removeById(id) {
    return db.execQuery(`
    update Customer set deletedAt = date(now()) where id = ${id};
  `);
  }
}

module.exports = { CustomerRepository };
