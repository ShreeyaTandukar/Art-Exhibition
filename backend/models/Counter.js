const mongoose = require("mongoose");

// Tiny helper collection used to hand out sequential numbers safely.
// Mongo's findOneAndUpdate with $inc is atomic, so two people registering
// at the exact same moment can never receive the same badge number.
const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Counter", counterSchema);
