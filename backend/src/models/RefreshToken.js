const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  refreshToken: String,
});

const RefreshToken = mongoose.model("Refresh_Token", RefreshTokenSchema);
module.exports = RefreshToken;
