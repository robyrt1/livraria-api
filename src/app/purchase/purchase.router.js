const {PurchaseController} = require("./purchase.controller");
const purchaseController  = new PurchaseController();
const purchaseRouter = (app) =>{
    app.get("/purchase", (req, res, next) => {
        purchaseController.findAll(req, res, next);
      });
    
      app.get("/purchase/:id", (req, res, next) => {
        purchaseController.findOneById(req, res, next);
      });
    
      app.post("/purchase", (req, res, next) => {
        purchaseController.create(req, res, next);
      });
}

module.exports = purchaseRouter