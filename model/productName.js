const mongoose = require("mongoose");

const productNameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductName", productNameSchema);
