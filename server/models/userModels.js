const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  }
}); // ✅ Added missing closing bracket for userSchema

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
