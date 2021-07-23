const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Port declare
const port = process.env.PORT || 4000;

// Routes decelaration
const userRoute = require("./routes/user");
const metalRoute = require("./routes/metal");
const productRoute = require("./routes/product");
const customerRoute = require("./routes/customer");
const billRoute = require("./routes/bill");
// DB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api", userRoute);
app.use("/api", metalRoute);
app.use("/api", productRoute);
app.use("/api", customerRoute);
app.use("/api", billRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// start server
app.listen(port, () => {
  console.log(`App is Running at Port ${port}`);
});
