const express = require("express");
const router = express.Router();
const { isSignin, isStaff } = require("../controllers/auth");
const { createProduct, getAllProduct } = require("../controllers/product");

router.post("/product", isSignin, isStaff, createProduct);

// get All product with pagination
router.get("/product", isSignin, isStaff, getAllProduct);

module.exports = router;
