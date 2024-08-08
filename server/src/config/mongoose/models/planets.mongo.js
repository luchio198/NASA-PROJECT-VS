const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

const PlanetSchema = mongoose.model("PlanetSchema", planetSchema);

module.exports = PlanetSchema;
