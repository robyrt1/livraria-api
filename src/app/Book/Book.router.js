const { BookController } = require("./Book.controller");
const bookController = new BookController();

const bookRoutes = (app) => {
  app.get("/book", (req, res, next) => {
    bookController.findAll(req, res, next);
  });

  app.get("/book/:id", (req, res, next) => {
    bookController.findOneById(req, res, next);
  });
  app.get("/book/barcode/:barcode", (req, res, next) => {
    bookController.findOneByBarcode(req, res, next);
  });
 
  app.post("/book", (req, res, next) => {
    bookController.create(req, res, next);
  });
};

module.exports = bookRoutes;
