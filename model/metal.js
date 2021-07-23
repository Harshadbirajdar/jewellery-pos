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
    date: { type: Date },
    value: { type: Number },
  },
};

module.exports = mongoose.model("Metal", metalSchema);
