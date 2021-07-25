const { validationResult } = require("express-validator");
const MetalTag = require("../model/metalTag");

exports.createMetalTag = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  const metalTag = new MetalTag(req.body);

  metalTag.save((err, metal) => {
    if (err) {
      if (err.keyPattern.tag === 1) {
        return res.status(400).json({
          error: `Tag Number ${err.keyValue.tag} is Already Present`,
        });
      }
      return res.status(400).json({
        error: "Something went wrong",
      });
    }

    return res.json(metal);
  });
};

exports.getMetalTag = (req, res) => {
  const tag = req.query.tag;

  MetalTag.findOne({ tag }).exec((err, tag) => {
    if (err) {
      return res.status(400).json({
        error: "Something Went Wrong",
      });
    }
    if (!tag) {
      return res.status(403).json({
        error: "Tag Not Found in Database",
      });
    }
    return res.json(tag);
  });
};
