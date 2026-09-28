const mongoose = require("mongoose");

const activationCodeSchema = require("./schemas/activationCodeSchema");

const activationCode = mongoose.model(
    "ActivationCode",
    activationCodeSchema
);
module.exports = activationCode;