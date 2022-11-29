const mongoose = require("mongoose");

const DB_URI =
  process.env.NODE_ENV !== "production"
    ? process.env.DEV_DB_LOCAL
    : process.env.DEV_DB_CLOUD;

module.exports = mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to database...");
  })
  .catch((err) => {
    console.log(`Error !! Cannot connect to database: ${err}`);
  });
