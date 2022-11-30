const express = require('express')
const bodyParser = require('body-parser');
const Routes = require('../routes/index');
class ExpressConfig {
    constructor() {
        if(!ExpressConfig._intance) ExpressConfig._intance = this;

        this.init();
    }

    getInstance(){
        return ExpressConfig._intance;
    }

    setServer(){
        if(!this.getInstance().app) this.getInstance().app = express();
    }

    getServer() {
        return this.getInstance().app;
    }

    setMiddlewares(middlewares) {
        middlewares.forEach((middleware) => this.getServer().use(middleware));
    }

    setRoutes(Routes) {
        Routes.forEach((route)=>{
            route(this.getServer())
        })
      }

    setErrorLogHandlers() {
        this.getServer().use(function (error, req, res, next){
            console.error(`[INFO-ERROR] - ${JSON.stringify(error)}`);
            res.status(error.statusCode || 500).json(error);
        })
    }

    init() {
        this.setServer();

        const middlewares = [
            bodyParser.urlencoded({extended: false}),
            bodyParser.json(),
        ]

        this.setMiddlewares(middlewares);
        this.setRoutes(Routes);
        this.setErrorLogHandlers();
    }
}

module.exports = { ExpressConfig }