const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type:String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
            default: "",
        },
        badges:

            {
                type:[String],
                default: [],
            },
        
        passportId: {
            type: String,
            default: "",
        },

        // FEATURE 2 — persistent badge.
        // Unique, server-generated, never regenerated on login or refresh.
        badgeNumber: {
            type: String,
            unique: true,
            sparse: true,
            index: true,
        },

        // Heritage places this specific account has explored.
        // Stored as references so heritage content can be edited freely
        // later without ever touching a user document.
        collectedHeritage: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "HeritageSite",
            },
        ],
        currentJourney: {
            type: String,
            default:"New Explorer",
        },
        completedSites: {
            type: Number,
            default: 0,
        },
        journeys: 
            {
                type:[String],
                default: [],
            },
        
        souvenirs:
            {
                type:[String],
                default: [],
            },
        
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model("User", userSchema);

module.exports = User;