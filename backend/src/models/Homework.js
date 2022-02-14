const mongoose = require("mongoose");
const Schema = mongoose.Schema;

HomeworkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  endTime: Date,
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  submitters: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Project",
    },
  ],
  appointedStudents: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  scoreTable: String,
});

const Homework = mongoose.model("Homework", HomeworkSchema);

module.exports = Homework;
