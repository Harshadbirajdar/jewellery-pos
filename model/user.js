const mongoose = require("mongoose");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    encryPassword: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    refershToken: [],
  },
  {
    timestamps: true,
  }
);
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.encryPassword = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticated: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encryPassword;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", process.env.SLAT)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
