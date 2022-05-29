const moment = require("moment");

const { VisitedPlace } = require("../models");

const createVisitedPlace = async (req, res, next) => {
  try {
    const newVisitedPlace = await VisitedPlace.create(req.body);

    return res.json(newVisitedPlace);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server error");
  }
};

const deleteVisitedPlace = async (req, res, next) => {
  try {
    const visitedPlace = await VisitedPlace.findByIdAndDelete(req.params.id);

    if (!visitedPlace) {
      return res.status(404).json({ msg: "Record not found." });
    }

    res.json({ msg: "Visited place removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Visited place not found." });
    }

    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

const getPlaces = async (req, res, next) => {
  try {
    const result = await VisitedPlace.distinct("place");
    const places = result.map(item => ({ label: item, value: item }));

    res.json(places);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

const getNotification = async (req, res, next) => {
  try {
    const date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 14);
    const hasOne = await VisitedPlace.find({ date: { $gte: moment(date).startOf("day").toDate() }, isCrowded: true }).count();
    let notification = {
      title: "Thank you!",
      message: "Thank you for helping to stop spread the virus by staying home.",
      severity: "success"
    };

    if (hasOne) {
      notification = {
        title: "You have been exposed!",
        message: "You have been exposed to a crowded place for the last 14 days.\nTry to avoid crowded places to minimized your exposure risk.",
        severity: "error"
      };
    }

    res.json(notification);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

const getVisitedPlaces = async (req, res, next) => {
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
      response = await VisitedPlace.aggregate([{ $match: filter }]).sortByCount(field);
    } else {
      const visitedPlaces = await VisitedPlace.find(filter)
        .skip(page * pageSize)
        .limit(pageSize)
        .sort(sort);
      const totalCount = await VisitedPlace.find(filter).count();
      response = { totalCount, visitedPlaces };
    }

    res.json(response);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

const getVisitedPlaceById = async (req, res, next) => {
  try {
    const visitedPlace = await VisitedPlace.findById(req.params.id);

    if (!visitedPlace) {
      return res.status(404).json({ msg: "Record not found." });
    }

    res.json(visitedPlace);
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
    const { acknowledged } = await VisitedPlace.deleteMany();

    if (!acknowledged) {
      return res.status(500).send("Server Error");
    }

    res.end();
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

const updateVisitedPlace = async (req, res, next) => {
  try {
    const visitedPlace = await VisitedPlace.findByIdAndUpdate(req.params.id, req.body);

    if (!visitedPlace) {
      return res.status(404).json({ msg: "Visited place not found." });
    }

    res.json(visitedPlace);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
};

module.exports = {
  createVisitedPlace,
  deleteVisitedPlace,
  getNotification,
  getPlaces,
  getVisitedPlaces,
  getVisitedPlaceById,
  resetData,
  updateVisitedPlace
};
