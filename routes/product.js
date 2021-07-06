const express = require("express");
const router = express.Router();
const { isSignin, isStaff } = require("../controllers/auth");
const { createProduct } = require("../controllers/product");

router.post("/product", isSignin, isStaff, createProduct);

module.exports = router;
