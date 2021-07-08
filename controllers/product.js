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

// get all product list with pagination

exports.getAllProduct = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;

  let startIndex = limit * page;
  const totalCount = await Product.find().countDocuments();
  Product.find()
    .skip(startIndex)
    .limit(limit)
    .populate("metal")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      return res.status(200).json({ totalCount, product });
    });
};
