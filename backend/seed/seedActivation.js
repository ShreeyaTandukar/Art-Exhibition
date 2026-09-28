const dotenv = require("dotenv");
const connectDB = require("../config/db");
const ActivationCode = require("../models/ActivationCode");

dotenv.config();

const seedActivation = async () => {
  try {
    await connectDB();

    const existing = await ActivationCode.findOne({ code: "BB-12345" });

    if (existing) {
      console.log("BB-12345 already exists.");
    } else {
      await ActivationCode.create({
        code: "BB-12345",
        site: "bagh-bhairav",
        used: false,
      });

      console.log("BB-12345 created successfully.");
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedActivation();
