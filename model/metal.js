const mongoose = require("mongoose");

const metalSchema = {
  name: {
    type: String,
    required: true,
  },
  purity: {
    type: String,
  },
  price: {
    date: { type: Date, default: new Date() },
    value: { type: Number, default: 0 },
  },
};

module.exports = mongoose.model("Metal", metalSchema);
