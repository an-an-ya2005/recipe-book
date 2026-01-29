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
  },
  likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  nutritionGoals: {
    highProtein: { type: Boolean, default: false },
    lowCarb: { type: Boolean, default: false },
    // Add more as needed
  }
}); // ✅ Added missing closing bracket for userSchema

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
