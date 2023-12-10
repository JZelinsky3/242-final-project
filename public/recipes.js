document.addEventListener('DOMContentLoaded', () => {
    fetchRecipes('morning', 'nutritious');
    fetchRecipes('evening', 'special');
});

async function fetchRecipes(meal, category) {
    try {
        const query = meal ? `?meal=${meal}&category=${category}` : '';
        const response = await fetch('/recipes-json' + query);
        const recipes = await response.json();
        displayRecipes(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-container');
    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        const titleElement = document.createElement('h3');
        titleElement.textContent = recipe.title;
        recipeElement.appendChild(titleElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = recipe.description;
        recipeElement.appendChild(descriptionElement);

        const ingredientsElement = document.createElement('ul');
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsElement.appendChild(li);
        });
        recipeElement.appendChild(ingredientsElement);

        const instructionsElement = document.createElement('ol');
        recipe.instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.textContent = instruction;
            instructionsElement.appendChild(li);
        });
        recipeElement.appendChild(instructionsElement);

        recipeContainer.appendChild(recipeElement);
    });
}
