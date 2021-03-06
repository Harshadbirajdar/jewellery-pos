const express = require("express");
const router = express.Router();
const {
  createMetalTag,
  getMetalTag,
  getAllMetalTag,
} = require("../controllers/metalTag");
const { isSignin, isStaff } = require("../controllers/auth");
const { check } = require("express-validator");

// create a metal tag
router.post(
  "/tag/metal",
  [
    check("tag")
      .isLength({ min: 1 })
      .withMessage("Please enter the Tag Number"),
    check("name")
      .isLength({ min: 3 })
      .withMessage("Please enter the Product Name"),
    check("hsn").isLength({ min: 2 }).withMessage("Please enter the HSN Code"),
    check("gst").isLength({ min: 1 }).withMessage("Please enter the GST"),
  ],
  isSignin,
  isStaff,
  createMetalTag
);

// get metal by Tag
router.get("/tag/metal", isSignin, isStaff, getMetalTag);

router.get("/tag", isSignin, isStaff, getAllMetalTag);
module.exports = router;
