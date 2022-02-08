const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchame = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  surname: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["students", "teacher"],
    default: "students",
  },
});

const User = mongoose.model("User", UserSchame);

module.exports = User;
