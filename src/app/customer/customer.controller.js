const { CustomerService } = require("./customer.service");
class CustomerController {
  constructor() {
    this.customerService = new CustomerService();
  }
  findAll(req, res, next) {
    const result = this.customerService.findAll();
    res.status(result.statusCode).json(result);
  }

  findOneById(req, res, next) {
    const  { id } = req.params
    const result = this.customerService.findOneByid(id);
    res.status(result.statusCode).json(result);
  }

  findOneByEmail(req, res, next){
    const { email } = req.body
    const result  = this.customerService.findOneByEmail(email);
    res.status(result.statusCode).json(result)
  }

  async create(req, res, next) {
    const result = await this.customerService.create(req.body);
    res.status(result.statusCode).json(result);
  }

  updateById(req, res, next){
    const { id } = req.params;
    const body = req.body
    const result = this.customerService.updateByid(id, body);
    res.status(result.statusCode).json(result);
  }
    

  removeById(req, res, next ) {
    const {id} = req.params;
    const result = this.customerService.removeById(id);
    res.status(result.statusCode).json(result);
  }
  
}
module.exports = { CustomerController };
