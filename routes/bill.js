const express = require("express");

const { isSignin, isStaff } = require("../controllers/auth");
const { createBill } = require("../controllers/bill");
const router = express.Router();

// creaete a bill
router.post("/bill", isSignin, isStaff, createBill);

module.exports = router;
