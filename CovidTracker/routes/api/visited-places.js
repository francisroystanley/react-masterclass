const { Router } = require("express");

const { VisitedPlaceCtrl } = require("../../controllers");
const { validatorMiddleware } = require("../../middleware");
const { createAndUpdateRules } = require("../../validations/visited-place");

const router = Router();

router.route("/")
  .get(VisitedPlaceCtrl.getVisitedPlaces)
  .post(validatorMiddleware(createAndUpdateRules), VisitedPlaceCtrl.createVisitedPlace);

router.route("/places")
  .get(VisitedPlaceCtrl.getPlaces);

router.route("/notification")
  .get(VisitedPlaceCtrl.getNotification);

router.route("/reset-data")
  .post(VisitedPlaceCtrl.resetData);

router.route("/:id")
  .get(VisitedPlaceCtrl.getVisitedPlaceById)
  .put(validatorMiddleware(createAndUpdateRules), VisitedPlaceCtrl.updateVisitedPlace)
  .delete(VisitedPlaceCtrl.deleteVisitedPlace);

module.exports = router;
