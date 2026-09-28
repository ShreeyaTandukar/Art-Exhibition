const mongoose = require("mongoose");
const activationCodeSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    site:{
        type:String,
        required:true,
    },
    used: {
        type:Boolean,
        default: false,
    },createdAt: {
        type:Date,
        default: Date.now,
    },
});
module.exports = activationCodeSchema;