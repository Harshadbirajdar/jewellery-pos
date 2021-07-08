const express = require("express");
const router = express.Router();
const { isSignin, isStaff } = require("../controllers/auth");
const {
  getCustomerByPhone,
  createCustomer,
} = require("../controllers/customer");

// get customer by phone Number
router.get("/customer", isSignin, isStaff, getCustomerByPhone);

// crete customer or update customer name
router.post("/customer", isSignin, isStaff, createCustomer);

module.exports = router;
