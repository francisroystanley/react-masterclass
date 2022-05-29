const moment = require("moment");

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

const getNames = async (req, res, next) => {
  try {
    const result = await SocialInteraction.distinct("name");
    const names = result.map(item => ({ label: item, value: item }));

    res.json(names);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

const getNotification = async (req, res, next) => {
  try {
    const date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 14);
    const hasOne = await SocialInteraction.find({ date: { $gte: moment(date).startOf("day").toDate() }, isSocialDistancing: false }).count();
    let notification = {
      title: "Keep it up!",
      message: "You are maintaining proper social distancing. Keep it up!",
      severity: "success"
    };

    if (hasOne) {
      notification = {
        title: "You did not practice social distancing!",
        message: "You did not practice social distancing for the last 14 days.\nStay at home and maintain 1-2 meters away from other people.",
        severity: "error"
      };
    }

    res.json(notification);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

const getSocialInteractions = async (req, res, next) => {
  try {
    const { field, fromDate, grouped = false, page, pageSize, toDate = new Date() } = req.query;
    const sort = `${req.query.sort || ""} -createdAt`;
    let filter = {
      date: {
        $lte: moment(toDate).endOf("day").toDate()
      }
    };
    let response = {};

    if (fromDate) filter.date.$gte = moment(fromDate).startOf("day").toDate();

    if (grouped) {
      response = await SocialInteraction.aggregate([{ $match: filter }]).sortByCount(field);
    } else {
      const socialInteractions = await SocialInteraction.find(filter)
        .skip(page * pageSize)
        .limit(pageSize)
        .sort(sort);
      const totalCount = await SocialInteraction.find(filter).count();
      response = { socialInteractions, totalCount };
    }

    res.json(response);
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

const resetData = async (req, res, next) => {
  try {
    const { acknowledged } = await SocialInteraction.deleteMany();

    if (!acknowledged) {
      return res.status(500).send("Server Error");
    }

    res.end();
  } catch (err) {
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
  getNames,
  getNotification,
  getSocialInteractions,
  getSocialInteractionById,
  resetData,
  updateSocialInteraction
};
