const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    instr: { type: String, required: true },
    imgurl: { type: String, required: true },
    category: { type: String, required: true }, // Added category field
    ingredients: [
      {
        name: { type: String, required: true },
        qty: { type: String, required: true },
      },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
