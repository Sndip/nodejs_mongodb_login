const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  users: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    default: 0,
  },
  employee: {
    type: Number,
    default: 0,
  },
  admin: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("dashboardStat", Schema);
