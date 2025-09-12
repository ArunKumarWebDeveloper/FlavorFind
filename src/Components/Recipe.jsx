
import  { useState } from "react";
import axios from "axios";

const Recipe = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "38838dd68703456a8d98f75a10639717";

  // Fetch recipes from Spoonacular
  const fetchRecipes = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            query,
            number: 10,
            apiKey,
          },
        }
      );

      setRecipes(res.data.results);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
      console.error("Error fetching recipes:",err);
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
        `https://api.spoonacular.com/recipes/${id}/information`,
        {
          params: {
            includeNutrition: true,
            apiKey,
          },
        }
      );
      setSelectedRecipe(res.data);
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
            <div
              className="instructions"
              dangerouslySetInnerHTML={{
                __html: selectedRecipe.instructions
                  ? selectedRecipe.instructions
                  : "<p>No instructions available.</p>",
              }}
            />

            <h3>Nutrition </h3>
            <ul className="nutrition-list">
              {selectedRecipe.nutrition?.nutrients?.slice(0, 8).map((n, i) => (
                <li key={i}>
                  <strong>{n.name}</strong>: {n.amount} {n.unit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;

