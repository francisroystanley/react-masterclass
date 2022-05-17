const { model, Schema } = require("mongoose");

const SocialInteractionSchema = new Schema({
  name: {
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
  isSocialDistancing: {
    type: Boolean,
    default: true
  }
});

const SocialInteraction = model("social_interaction", SocialInteractionSchema);

module.exports = SocialInteraction;
