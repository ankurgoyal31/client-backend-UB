const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
  {},
  {
    strict: false,
    collection: "applied",
  }
);

module.exports = mongoose.model("Apply", applySchema);