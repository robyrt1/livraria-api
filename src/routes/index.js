const bookRoutes = require('../app/Book/Book.router')
const customerRoute = require ("../app/customer/customer.router");
const purchase = require("../app/purchase/purchase.router")
const inventoryRouter = require("../app/inventory/Inventory.router")

module.exports=  Routes = [
    bookRoutes,
    customerRoute,
    purchase,
    inventoryRouter
]