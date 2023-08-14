const mongoose = require("mongoose");

const DB_URI = "mongodb://127.0.0.1:27017/read-app"; // Replace with your MongoDB connection URI

mongoose.connect(DB_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Export the database connection for use in other modules
module.exports = db;
