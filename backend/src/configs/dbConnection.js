const mongoose = require("mongoose");

const { MONGO_DB_URL } = process.env;

mongoose
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("db connection error => ", err));
