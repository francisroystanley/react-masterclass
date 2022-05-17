const { Router } = require("express");

const apiRouter = require("./api");

const routes = Router();

routes.use("/api", apiRouter);

module.exports = routes;
