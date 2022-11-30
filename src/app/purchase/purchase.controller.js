const {PurchaseService} = require("./purchase.service");
class PurchaseController {
    constructor(){
        this.PurchaseService = new PurchaseService();
    }
     findAll(req, res, next) {
        const result =  this.PurchaseService.findAll();
        res.status(result.statusCode).json(result);
      }
    
       findOneById(req, res, next){
        const result =  this.PurchaseService.findOneByid(req.params.id);
        res.status(result.statusCode).json(result);
      }
    
       async create(req, res, next) {
        const result = await this.PurchaseService.create(req.body);
        res.status(result.statusCode).json(result);
      }
}
module.exports = {PurchaseController}