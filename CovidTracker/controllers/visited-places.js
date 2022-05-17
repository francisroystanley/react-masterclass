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

const getVisitedPlaces = async (req, res, next) => {
  try {
    const visitedPlaces = await VisitedPlace.find().sort({ date: -1 });

    res.json(visitedPlaces);
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
  getVisitedPlaces,
  getVisitedPlaceById,
  updateVisitedPlace
};
