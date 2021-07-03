const { validationResult } = require("express-validator");
const User = require("../model/user");

const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

// create a new user
exports.resgisterUser = (req, res) => {
  const user = new User(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Username is Already Exist....",
      });
    }
    res.json(user);
  });
};

// login user

exports.loginUser = (req, res) => {
  const errors = validationResult(req);
  const { userName, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ userName }, async (err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    } else {
      if (!user.authenticated(password)) {
        return res.status(400).json({
          error: "username and password does not match",
        });
      }
      const accessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "10s",
        }
      );
      const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET
      );

      user.refershToken.push(refreshToken);
      await user.save();
      const { _id, name, userName, role } = user;
      return res.json({
        accessToken,
        refreshToken,
        user: { _id, name, userName, role },
      });
    }
  });
};

exports.isSignin = (req, res, next) => {
  let authToken = req.headers.authorization;
  if (!authToken)
    return res.status(403).json({ error: "Authorization Token Not Found" });

  jwt.verify(
    authToken.split(" ")[1],
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err)
        return res.status(401).json({ error: "Authorization Token Expired" });

      User.findById(user._id).exec((err, user) => {
        if (err) return res.status(400).json({ error: "Something Went wrong" });
        if (!user)
          return res.status(403).json({ error: "User Not Found in Database" });
        req.profile = user;
        next();
      });

      // return res.json({ _id: user._id });
    }
  );

  // res.json(authToken.split(" ")[1]);
};
// test token
exports.test = (req, res) => {
  jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    return res.json(user);
  });
};

exports.isAdmin = (req, res, next) => {
  let user = req.profile;

  if (user.role !== 2) {
    return res.status(400).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.refershToken = (req, res) => {
  const token = req.body.token;
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    let id = user._id;

    User.findById(id)
      .select("refershToken role")
      .exec((err, userToken) => {
        if (err) {
          return res.status(400).json({
            error: "Something went wrong",
          });
        }
        if (!token || !userToken.refershToken.includes(token)) {
          return res.status(403).json({
            error: "Refresh token not found",
          });
        }
        const accessToken = jwt.sign(
          { _id: userToken._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "10s",
          }
        );
        res.json({
          accessToken,
          refershToken: req.body.token,
          role: userToken.role,
        });
      });
  });
};
