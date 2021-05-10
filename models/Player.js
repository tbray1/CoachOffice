const mongoose = require("mongoose");

const PlayerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  jersey: {
    type: Number,
    required: false,
    unique: true,
  },

  position: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("player", PlayerSchema);
