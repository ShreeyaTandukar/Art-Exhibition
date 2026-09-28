const mongoose = require("mongoose");
const heritageSiteSchema = require("./schemas/heritageSiteSchema");

module.exports = mongoose.model("HeritageSite", heritageSiteSchema);