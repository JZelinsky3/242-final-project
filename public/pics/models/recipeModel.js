const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    author: String,
    difficulty: String,
    cookTime: String,
    ingredients: [String],
    instructions: [String]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
