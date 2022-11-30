
const { InventoryService } = require("./Inventory.service");


class InventoryController {
  constructor() {
    this.inventoryService = new InventoryService();
  }
   findAll(req, res, next) {
    const result =  this.inventoryService.findAll();
    res.status(result.statusCode).json(result);
  }

   findOneById(req, res, next){
    const result =  this.inventoryService.findOneById(req.params.id);
    res.status(result.statusCode).json(result);
  }

  async create(req, res, next) {
    const result = await this.inventoryService.create(req.body);
    res.status(result.statusCode).json(result);
  }
}

module.exports = { InventoryController };
