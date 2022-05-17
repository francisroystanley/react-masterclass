const { SocialInteraction } = require("../models");

const createSocialInteraction = async (req, res, next) => {
  try {
    const newSocialInteraction = await SocialInteraction.create(req.body);

    return res.json(newSocialInteraction);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server error");
  }
};

const deleteSocialInteraction = async (req, res, next) => {
  try {
    const socialInteraction = await SocialInteraction.findByIdAndDelete(req.params.id);

    if (!socialInteraction) {
      return res.status(404).json({ msg: "Record not found." });
    }

    res.json({ msg: "Social interaction removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Record not found." });
    }

    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

const getSocialInteractions = async (req, res, next) => {
  try {
    const socialInteractions = await SocialInteraction.find().sort({ date: -1 });

    res.json(socialInteractions);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

const getSocialInteractionById = async (req, res, next) => {
  try {
    const socialInteraction = await SocialInteraction.findById(req.params.id);

    if (!socialInteraction) {
      return res.status(404).json({ msg: "Record not found." });
    }

    res.json(socialInteraction);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Record not found." });
    }

    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

const updateSocialInteraction = async (req, res, next) => {
  try {
    const socialInteraction = await SocialInteraction.findByIdAndUpdate(req.params.id, req.body);

    if (!socialInteraction) {
      return res.status(404).json({ msg: "Record not found." });
    }

    res.json(socialInteraction);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

module.exports = {
  createSocialInteraction,
  deleteSocialInteraction,
  getSocialInteractions,
  getSocialInteractionById,
  updateSocialInteraction
};
