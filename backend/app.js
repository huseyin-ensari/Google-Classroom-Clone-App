// npm imports
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// file imports
const router = require("./src/routers");
const customErrorHandler = require("./src/middlewares/errors/customErrorHandler");

// database
require("./src/configs/dbConnection");

// app settings
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    // origin: process.env.CLIENT_URL,
    // credentials: true,
  })
);

// router
app.use("/api", router);

// error handler
app.use(customErrorHandler);

// listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(PORT, " active"));
