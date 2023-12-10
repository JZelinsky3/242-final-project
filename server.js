const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://jzelinsky18:nSzIkd4O4vtyOCo0@cluster0.0fwvmjy.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB...", err));

    const recipeSchema = new mongoose.Schema({
        title: String,
        description: String,
        image: String,
        author: String,
        difficulty: String,
        cookTime: String,
        meal: String,
        category: String,
        ingredients: [String],
        instructions: [String]
    });

const Recipe = mongoose.model('Recipe', recipeSchema);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/recipes-json', async (req, res) => {
    try {
        const recipes = await Recipe.find();

        res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/api/data", (req, res) => {
    fs.readFile("recipes.json", (err, data) => {
        if (err) {
            console.error("Error reading data:", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        const recipesData = JSON.parse(data);
        res.json(recipesData);
    });
  });

app.get('/recipes', (req, res) => {
  res.sendFile(path.join(__dirname, 'recipes.html'));
});

app.get('/shoppinglist', (req, res) => {
  res.sendFile(path.join(__dirname, 'shoppinglist.html'));
});

app.get('/mealplanner', (req, res) => {
  res.sendFile(path.join(__dirname, 'mealplanner.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/morning', (req, res) => {
    res.sendFile(path.join(__dirname, 'morning.html'));
  });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
