const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://rutujab2021_db_user:xqo5jxeClSVrRolu@cluster0.pkeo5es.mongodb.net/?appName=Cluster0");

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Database Connection Failed");
    process.exit(1);
  }
};

module.exports = connectDB;