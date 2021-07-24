const express = require("express");

const { isSignin, isStaff } = require("../controllers/auth");
const { createBill, getAllBillReport } = require("../controllers/bill");
const router = express.Router();

// creaete a bill
router.post("/bill", isSignin, isStaff, createBill);

// get All bill report
router.get("/bill/report", getAllBillReport);

module.exports = router;
