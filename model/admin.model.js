const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

const Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

// Schema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     {
//       id: this._id,
//       username: this.username,
//       accountType: "admin",
//       password: this.password,
//     },
//     process.env.JWT_TOKEN,
//     {
//       expiresIn: process.env.JWT_EXPIRES_IN,
//     }
//   );
//   return token;
// };

module.exports = mongoose.model("admin", Schema);
