import React, { useState } from 'react';
import RecipeList from './RecipeList';
import logo from './logo.png';
import './App.css';

function App() {
    const [ingredient, setIngredient] = useState('');
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
            const data = await response.json();
            setRecipes(data.meals || []);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchRecipes();
    };

    return (
        <div className="App">
            <img src={logo} alt="Recipe Ideas Logo" className="logo" />
            <h1>Welcome to Taylor's Kitchen</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                    placeholder="Enter ingredients (e.g., chicken, garlic)"
                />
                <button type="submit">Search</button>
            </form>
            <RecipeList recipes={recipes} />
        </div>
    );
}

export default App;
