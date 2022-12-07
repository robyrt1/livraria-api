const db = require("../config/mysql.config");
const dayjs = require("dayjs");

class BookRepository {
  findAll() {
    return db.execQuery(`
            select * from Book;
        `);
  }

  findOneById(id) {
    return db.execQuery(`
            select * from Book where id = ${id};
         `);
  }

  findOneByBarcode(barcode) {
    return db.execQuery(`select * from Book where barcode = ${barcode}`);
  }

  create(data) {
    const { publishId, genreId, title, author, barcode, price } = data;
    return db.execQuery(` 
            insert into 
                Book
                (
                    publishId,
                    genreId,
                    title,
                    author,
                    barcode,
                    price,
                    createdAt
                ) 
                values
                (
                    '${publishId}',
                    '${genreId}',
                    '${title}',
                    '${author}',
                    '${barcode}',
                    '${price}',
                    '${dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
                );
        `);
  }

  updateByid(id, data) {
    const { publishId, genreId, title, author, barcode, price } = data;
    return db.execQuery(`
        update 
            Book 
        set
            publishId=${publishId},
            genreId=${genreId},
            title=${title},
            author=${author},
            barcode=,${barcode}
            price=${price} 
        where 
            id = ${id};
    `);
  }

  removeByid(id) {
    return DelayNode.execQuery(`
        update Book set updatedAt = date(now()) where id=${id};
    `);
  }
}

module.exports = { BookRepository };
