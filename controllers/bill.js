const Bill = require("../model/bill");
const Product = require("../model/product");

exports.createBill = async (req, res, next) => {
  let bill = new Bill(req.body);

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
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    req.bill = bill;
    res.json(bill);
    //   next();
  });
};
