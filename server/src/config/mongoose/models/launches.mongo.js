const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: Number,
      required: true,
    },
    mission: { type: String, required: true },
    rocket: { type: String, required: true },
    launchDate: {
      type: Date,
      required: true,
    },
    target: {
      // type: mongoose.ObjectId,
      // ref: "PlanetSchema",
      type: String,
    },
    customers: [String],
    upcoming: {
      type: Boolean,
      default: true,
    },
    success: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LaunchSchema = mongoose.model("LaunchSchema", launchesSchema);

module.exports = LaunchSchema;
