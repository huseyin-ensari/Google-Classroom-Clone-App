const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { nanoid } = require("nanoid");

const ClassroomSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: String,
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  students: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  accessCode: String,
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
  homeworks: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Homework",
    },
  ],
});

ClassroomSchema.pre("save", function (next) {
  if (this.accessCode) return next();
  this.accessCode = nanoid(5).toUpperCase().trim();
  next();
});

const Classroom = mongoose.model("Classroom", ClassroomSchema);

module.exports = Classroom;
