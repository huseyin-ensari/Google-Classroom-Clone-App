// npm imports
const express = require("express");
require("dotenv").config();

// file imports
const router = require("./src/routers");
const customErrorHandler = require("./src/middlewares/errors/customErrorHandler");

// database
require("./src/configs/dbConnection");

// app settings
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use("/api", router);

// error handler
app.use(customErrorHandler);

// listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(PORT, " active"));
