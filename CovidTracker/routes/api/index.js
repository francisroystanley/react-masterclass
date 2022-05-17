const { Router } = require("express");

const socialInteractionsRouter = require("./social-interactions");
const visitedPlacesRouter = require("./visited-places");

const apiRouter = Router();

apiRouter.use("/social-interactions", socialInteractionsRouter);
apiRouter.use("/visited-places", visitedPlacesRouter);

module.exports = apiRouter;
