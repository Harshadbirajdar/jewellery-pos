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

exports.getAllProductNameList = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = page * limit;

  const totalCount = await ProductName.find().countDocuments();
  ProductName.find()
    .limit(limit)
    .skip(startIndex)
    .exec((err, productName) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      return res.json({ productName, totalCount });
    });
};

exports.deleteProductName = (req, res) => {
  const id = req.body._id;

  ProductName.findByIdAndDelete(id).exec((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    if (!product) {
      return res.status(400).json({
        error: "Product Name Not Found in Database",
      });
    }
    return res.json(product);
  });
};
