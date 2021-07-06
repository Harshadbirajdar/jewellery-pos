const express = require("express");
const { check } = require("express-validator");
const { isSignin, isAdmin, isStaff } = require("../controllers/auth");
const {
  createMetal,
  viewAllMetals,
  viewAllMetalsList,
} = require("../controllers/metal");
const router = express.Router();

// create a metal
router.post(
  "/metal",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Please enter the Metal name"),
  ],
  isSignin,
  isAdmin,
  createMetal
);
// get all metal
router.get("/metal", isSignin, isAdmin, viewAllMetals);

// get all metal list
router.get("/metal/list", isSignin, isStaff, viewAllMetalsList);

module.exports = router;
