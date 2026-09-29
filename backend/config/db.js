const dns = require("dns");
const mongoose = require("mongoose");

// Use reliable public DNS servers for MongoDB Atlas SRV resolution
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);
  }
};

module.exports = connectDB;