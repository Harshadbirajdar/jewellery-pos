const mongoose = require("mongoose");

const metalSchema = {
  name: {
    type: String,
    required: true,
  },
  purity: {
    type: String,
  },
};

module.exports = mongoose.model("Metal", metalSchema);
