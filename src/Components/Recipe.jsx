import { useState } from "react";
import axios from "axios";

const Recipe = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "38838dd68703456a8d98f75a10639717"; 

  // Fetch recipes from Spoonacular
  const fetchRecipes = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=6&addRecipeInformation=true&apiKey=${API_KEY}`
      );
      if (res.data.results && res.data.results.length > 0) {
        setRecipes(res.data.results);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch full recipe info (including nutrition)
  const fetchRecipeDetails = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
      );
      setSelectedRecipe(res.data);
    } catch (err) {
      console.error("Error fetching recipe details:", err);
      setError("Failed to fetch recipe details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="home" className="recipe-list">
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
          <div className="recipe-card" key={r.id}>
            <img src={r.image} alt={r.title} />
            <p>{r.title}</p>
            <button onClick={() => fetchRecipeDetails(r.id)}>View Recipe</button>
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
            <h2>{selectedRecipe.title}</h2>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              style={{ width: "100%", borderRadius: "12px" }}
            />

            <h3>Instructions</h3>
            <div className="instructions">
              <p
                dangerouslySetInnerHTML={{
                  __html: selectedRecipe.instructions || "No instructions available.",
                }}
              />
            </div>

            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.extendedIngredients?.map((ing, i) => (
                <li key={i}>
                  {ing.original}
                </li>
              ))}
            </ul>

            <h3>Nutrition</h3>
            {selectedRecipe.nutrition ? (
              <ul>
                {selectedRecipe.nutrition.nutrients.slice(0, 6).map((n, i) => (
                  <li key={i}>
                    {n.name}: {n.amount} {n.unit}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No nutrition data available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
