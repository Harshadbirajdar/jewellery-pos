const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { isSignin, isAdmin, isStaff } = require("../controllers/auth");
const {
  createProductName,
  getProductName,
} = require("../controllers/productName");

// create product Name
router.post(
  "/item",
  [
    check("name")
      .isLength({ min: 2 })
      .withMessage("Please enter the Product Name"),
  ],
  isSignin,
  isAdmin,
  createProductName
);

router.get("/item", isSignin, isStaff, getProductName);
module.exports = router;
