const express = require("express");
const router = express.Router();
const {
  resgisterUser,
  loginUser,
  test,
  isSignin,
  isAdmin,
  refershToken,
} = require("../controllers/auth");
const { check } = require("express-validator");

// Register new user
router.post(
  "/signup",
  [
    check("name").isLength({ min: 2 }).withMessage("Please enter the name"),
    check("userName")
      .isLength({ min: 2 })
      .withMessage("Please enter the Username"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Please enter minmum 6 charcter password"),
  ],
  resgisterUser
);

router.post(
  "/signin",
  [
    check("userName")
      .isLength({ min: 2 })
      .withMessage("Please enter the Username"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Please enter minmum 6 charcter password"),
  ],
  loginUser
);
router.post("/test", isSignin, isAdmin, (req, res) => {
  res.send("<h1>test</h1>");
});

router.post("/token", refershToken);
module.exports = router;
