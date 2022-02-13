const mongoose = require("mongoose");
const Schema = mongoose.Schema;

ProjectSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  file: String,
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
