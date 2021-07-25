const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const metalTag = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    metal: {
      type: ObjectId,
      ref: "Metal",
    },
    hsn: {
      type: Number,
    },
    gst: {
      type: Number,
    },
    labour: {
      type: Number,
    },
    labourOn: {
      type: Number,
    },
    tag: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
const MetalTag = mongoose.model("MetalTag", metalTag);

MetalTag.createIndexes();

module.exports = MetalTag;
