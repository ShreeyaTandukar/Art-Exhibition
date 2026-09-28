const mongoose = require("mongoose");

// NOTE: the custom DNS servers that used to be set here were only needed to
// resolve the MongoDB Atlas SRV record. For a local mongodb://127.0.0.1
// connection they are unnecessary, and on some networks they break DNS
// entirely, so they have been removed.

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);
    console.error(
      "Is mongod running? Try: mongosh mongodb://127.0.0.1:27017/heritagelinkdb"
    );
    process.exit(1);
  }
};

module.exports = connectDB;