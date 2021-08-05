const { validationResult } = require("express-validator");
const ProductName = require("../model/productName");

exports.createProductName = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  const productName = new ProductName(req.body);

  productName.save((err, productName) => {
    if (err) {
      if (err.keyPattern.name === 1) {
        return res.status(400).json({
          error: `${err.keyValue.name} is Already Present`,
        });
      }
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    return res.json(productName);
  });
};

exports.getProductName = (req, res) => {
  ProductName.find()
    .select("name")
    .exec((err, name) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }

      return res.json(name);
    });
};
