const express = require("express");
const router = express.Router();
const { isSignin, isStaff } = require("../controllers/auth");
const {
  getCustomerByPhone,
  createCustomer,
  getAllCustomer,
} = require("../controllers/customer");

// get customer by phone Number
router.get("/customer", isSignin, isStaff, getCustomerByPhone);

// crete customer or update customer name
router.post("/customer", isSignin, isStaff, createCustomer);

router.get("/customer/list", isSignin, isStaff, getAllCustomer);
module.exports = router;
