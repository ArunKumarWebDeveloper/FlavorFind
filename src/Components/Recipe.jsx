import { useState } from "react";
import axios from "axios";

const Recipe = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch recipes from TheMealDB
  const fetchRecipes = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );

      if (res.data.meals) {
        // Limit to 5 results
        setRecipes(res.data.meals.slice(0, 6));
      } else {
        setRecipes([]);
      }
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
      console.error("Error fetching recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch details of single recipe
  const fetchRecipeDetails = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (res.data.meals) {
        setSelectedRecipe(res.data.meals[0]);
      }
    } catch (err) {
      setError("Failed to fetch recipe details.");
      console.error("Error fetching recipe details:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="recipe" className="recipe-list">
      {/* Search Section */}
      <div className="search-bar">
        <input
          type="search"
          placeholder="Type your favorite food..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search" onClick={fetchRecipes}>
          Search
        </button>
      </div>

      {/* Loading + Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Recipe Cards */}
      <div className="main-recipe">
        {recipes.length === 0 && !loading && (
          <h5>No recipes found. Type something!</h5>
        )}
        {recipes.map((r) => (
          <div className="recipe-card" key={r.idMeal}>
            <img src={r.strMealThumb} alt={r.strMeal} />
            <p>{r.strMeal}</p>
            <button onClick={() => fetchRecipeDetails(r.idMeal)}>
              View Recipe
            </button>
          </div>
        ))}
      </div>

      {/* Popup for Recipe Details */}
      {selectedRecipe && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close-btn"
              onClick={() => setSelectedRecipe(null)}
            >
              &times;
            </span>
            <h2>{selectedRecipe.strMeal}</h2>
            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              style={{ width: "100%", borderRadius: "12px" }}
            />

            <h3>Instructions</h3>
            <div className="instructions">
              <p>{selectedRecipe.strInstructions}</p>
            </div>

            <h3>Category</h3>
            <p>{selectedRecipe.strCategory}</p>

            <h3>Area</h3>
            <p>{selectedRecipe.strArea}</p>

            <h3>Ingredients</h3>
            <ul>
              {Array.from({ length: 25 }).map((_, i) => {
                const ingredient = selectedRecipe[`strIngredient${i + 1}`];
                const measure = selectedRecipe[`strMeasure${i + 1}`];
                if (ingredient && ingredient.trim() !== "") {
                  return (
                    <li key={i}>
                      {ingredient} - {measure}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
