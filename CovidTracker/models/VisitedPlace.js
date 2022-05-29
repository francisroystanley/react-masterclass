const { model, Schema } = require("mongoose");

const VisitedPlaceSchema = new Schema(
  {
    place: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    hours: {
      type: Number,
      required: true
    },
    isCrowded: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const VisitedPlace = model("visited_place", VisitedPlaceSchema);

module.exports = VisitedPlace;
