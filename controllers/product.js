const Product = require("../model/product");

// create Product
exports.createProduct = (req, res) => {
  Product.insertMany(req.body, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }

    return res.json(product);
  });
};
