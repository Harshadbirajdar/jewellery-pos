const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Counter = require("./counter");

const billSchema = new mongoose.Schema({
  customer: {
    type: ObjectId,
    ref: "Customer",
  },
  billNo: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
  },
  gst3: {
    type: Number,
  },
  totalAmount: {
    type: Number,
  },
  cash: {
    type: Number,
    default: 0,
  },
  online: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  // pending: {
  //   type: Number,
  //   default: 0,
  // },

  product: [
    {
      _id: {
        type: ObjectId,
        ref: "Prodcut",
      },
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
      qty: {
        type: Number,
      },
      tag: {
        type: Number,
      },
      rate: {
        type: Number,
      },
      amount: {
        type: Number,
      },
    },
  ],

  createdAt: {
    type: Date,
  },
});
billSchema.pre("save", function (next) {
  var doc = this;

  Counter.findByIdAndUpdate(
    { _id: "billNo" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  ).exec((err, data) => {
    doc.billNo = doc.billNo + data.seq;
    doc.createdAt = new Date();
    doc.populate("customer").execPopulate();
    next();
  });
});

module.exports = mongoose.model("Bill", billSchema);
