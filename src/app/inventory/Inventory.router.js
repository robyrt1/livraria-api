const { InventoryController } = require("./Inventory.controller");
const inventoryController = new InventoryController();

const inventoryRouter = (app) => {
  app.get("/inventory", (req, res, next) => {
    inventoryController.findAll(req, res, next);
  });

  app.get("/inventory/:id", (req, res, next) => {
    inventoryController.findOneById(req, res, next);
  });

  app.post("/inventory", (req, res, next) => {
    inventoryController.create(req, res, next);
  });
};

module.exports = inventoryRouter;
