const { Router } = require("express");

const { SocialInteractionCtrl } = require("../../controllers");
const { validatorMiddleware } = require("../../middleware");
const { createAndUpdateRules } = require("../../validations/social-interaction");

const router = Router();

router.route("/")
  .get(SocialInteractionCtrl.getSocialInteractions)
  .post(validatorMiddleware(createAndUpdateRules), SocialInteractionCtrl.createSocialInteraction);

router.route("/names")
  .get(SocialInteractionCtrl.getNames);

router.route("/notification")
  .get(SocialInteractionCtrl.getNotification);

router.route("/reset-data")
  .post(SocialInteractionCtrl.resetData);

router.route("/:id")
  .get(SocialInteractionCtrl.getSocialInteractionById)
  .put(validatorMiddleware(createAndUpdateRules), SocialInteractionCtrl.updateSocialInteraction)
  .delete(SocialInteractionCtrl.deleteSocialInteraction);

module.exports = router;
