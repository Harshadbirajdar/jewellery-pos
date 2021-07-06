const Metal = require("../model/metal");
const { validationResult } = require("express-validator");

exports.createMetal = (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  let metal = new Metal(req.body);
  metal.save((err, metal) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    return res.json(metal);
  });
};

exports.viewAllMetals = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = page * limit;

  const totalCount = await Metal.find().countDocuments();
  Metal.find()
    .limit(limit)
    .skip(startIndex)
    .exec((err, metals) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      return res.json({ metals, totalCount });
    });
};
exports.viewAllMetals = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = page * limit;

  const totalCount = await Metal.find().countDocuments();
  Metal.find()
    .limit(limit)
    .skip(startIndex)
    .exec((err, metals) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      return res.json({ metals, totalCount });
    });
};
exports.viewAllMetalsList = async (req, res) => {
  Metal.find()
  .exec((err, metals) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    return res.json(metals);
  });
};
