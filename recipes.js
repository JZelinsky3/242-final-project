const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs/promises');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://jzelinsky18:nSzIkd4O4vtyOCo0@cluster0.0fwvmjy.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB...", err));

const Recipe = mongoose.model('Recipe', {
    title: String,
    image: String,
    description: String,
    author: String,
    difficulty: String,
    cookTime: String,
    ingredients: [String],
    instructions: [String]
});

app.use(bodyParser.json());

app.get('/recipes', async (req, res) => {
    const { meal, category, title } = req.query;
    try {
        let recipes;

        if (title) {
            recipes = await Recipe.find({ title });
        } else if (meal) {
            recipes = await Recipe.find({ meal, category });
        } else {
            recipes = await Recipe.find();
        }

        res.json(recipes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


async function readRecipesFromJsonFile(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        const recipes = JSON.parse(content);
        return recipes;
    } catch (error) {
        console.error('Error reading recipes from JSON file:', error);
        return [];
    }
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
