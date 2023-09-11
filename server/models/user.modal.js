const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Add The user name"],
    },
    email: {
      type: String,
      required: [true, "Please Add The user Email Address"],
      unique: [true, "Email Address already in use"],
    },
    password: {
      type: String,
      required: [true, "Please Add The user password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
