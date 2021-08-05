const express = require("express");

const { isSignin, isStaff } = require("../controllers/auth");
const {
  createBill,
  getAllBillReport,
  exportBillReport,
} = require("../controllers/bill");
const { pushBillInCustomer } = require("../controllers/customer");
const router = express.Router();

// creaete a bill
router.post("/bill", isSignin, isStaff, createBill, pushBillInCustomer);

// get All bill report
router.get("/bill/report", getAllBillReport);

router.get("/excel/bill", isSignin, isStaff, exportBillReport);
module.exports = router;
