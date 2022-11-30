const {CustomerController} = require("./customer.controller");
const customerController  = new CustomerController();
const customerRoute = (app) =>{
    app.get("/customer", (req, res, next) => {
        customerController.findAll(req, res, next);
      });
    
      app.get("/customer/:id", (req, res, next) => {
        customerController.findOneById(req, res, next);
      });
    
      app.post("/customer/email", (req, res, next )=>{
        customerController.findOneByEmail(req,res, next);
      })

      app.post("/customer", (req, res, next) => {
        customerController.create(req, res, next);
      });

      app.put("/customer/update/:id", (req, res, next)=>{
        customerController.updateById(req, res,next);
      })

      app.delete("/customer/delete/:id", (req, res, next)=>{
        customerController.removeById(req, res, next);
      })
}

module.exports = customerRoute