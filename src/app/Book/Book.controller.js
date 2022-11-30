
const { BookService } = require("./Book.service");


class BookController {
  constructor() {
    this.bookService = new BookService();
  }
   findAll(req, res, next) {
    const result =  this.bookService.findAll();
    res.json(result);
  }

   findOneById(req, res, next){
    const result =  this.bookService.findOneByid(req.params.id);
    res.status(result.statusCode).json(result);
  }

  // findOneByBarcode(req, res, next) {
  //   const result = this.bookService.findOneByBarcode(req.params.barcode);
  //   res.status(result.statu).json(result)
  // }

   create(req, res, next) {
    const result =  this.bookService.create(req.body);
    res.json(result);
  }
}

module.exports = { BookController };

