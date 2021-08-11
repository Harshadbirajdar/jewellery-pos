const Bill = require("../model/bill");
const Product = require("../model/product");
const excel = require("exceljs");
const moment = require("moment");
exports.createBill = async (req, res, next) => {
  let bill = new Bill({
    ...req.body,
    totalAmount: req.body.totalAmount - req.body.discount,
    pendign: parseInt(req.body.totalAmount) - req.body.discount - req.body.cash,
  });
  console.log(
    parseInt(req.body.totalAmount) - req.body.discount - req.body.cash
  );
  let stockUpdate = [];
  let product = req.body.product;
  product.map((product) => {
    let stock = {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { qty: -product.qty, sale: product.qty } },
      },
    };

    stockUpdate.push(stock);
  });

  Product.bulkWrite(stockUpdate);

  bill.save((err, bill) => {
    console.log(err);
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    req.bill = bill;
    // res.json(bill);
    next();
  });
};

exports.getAllBillReport = async (req, res) => {
  const startDate = new Date(
    new Date(req.query.startDate).setHours(00, 00, 00)
  );
  const endDate = new Date(new Date(req.query.endDate).setHours(23, 59, 59));
  const sort = req.query.sort || "asc";

  const limit = parseInt(req.query.rowPerPage) || 10;
  const page = parseInt(req.query.page);
  const startIndex = limit * page;

  const totalCount = await Bill.find({
    createdAt: { $gte: startDate, $lte: endDate },
  }).countDocuments();

  Bill.find({ createdAt: { $gte: startDate, $lte: endDate } })
    .limit(limit)
    .skip(startIndex)
    .sort([["createdAt", sort]])
    .populate("customer")
    .exec((err, bill) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      return res.json({
        bill,
        totalCount,
      });
    });
};

exports.exportBillReport = (req, res) => {
  const startDate = new Date(
    new Date(req.query.startDate).setHours(00, 00, 00)
  );
  const endDate = new Date(new Date(req.query.endDate).setHours(23, 59, 59));
  let array = [];
  Bill.find({ createdAt: { $gte: startDate, $lte: endDate } })
    .populate("customer", "name phoneNumber")
    .exec((err, bill) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }

      bill.map((bill) => {
        let a = {
          billNo: bill.billNo,
          cash: bill.cash,
          online: bill.online ? bill.online : "-",
          discount: bill.discount ? bill.discount : "-",
          amount: Number(bill.amount.toFixed(2)),
          gst: Number(bill.gst3.toFixed(2)),
          totalAmount: parseInt(bill.totalAmount),
          name: bill.customer?.name ? bill.customer?.name : "-",
          phoneNumber: bill.customer?.phoneNumber
            ? bill.customer?.phoneNumber
            : "-",
          date: moment(bill.createdAt).format("DD/MM/YYYY"),
        };
        array.push(a);
      });

      return res.json(array);
    });
};
