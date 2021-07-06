const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Counter = require("./counter");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    metal: {
      type: ObjectId,
      ref: "Metal",
    },
    shortName: {
      type: String,
    },
    hsn: {
      type: Number,
    },
    gst: {
      type: Number,
    },
    grossWt: {
      type: Number,
    },
    netWt: {
      type: Number,
    },
    labour: {
      type: Number,
    },
    labourOn: {
      type: Number,
    },
    qty: {
      type: Number,
    },
    sale: {
      type: Number,
      default: 0,
    },
    tag: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
productSchema.pre("insertMany", function (next, docs) {
  Counter.findByIdAndUpdate(
    { _id: "tag" },
    { $inc: { seq: docs.length } },
    { upsert: true, new: true }
  ).exec((err, data) => {
    let seq = data.seq - docs.length;
    docs.map((doc) => {
      seq = seq + 1;
      doc.tag = seq;
    });

    next();
  });
});
module.exports = mongoose.model("Product", productSchema);
