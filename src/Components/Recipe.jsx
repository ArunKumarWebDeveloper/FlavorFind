import React, { useState } from "react";
import axios from "axios";

const API_KEY = "38838dd68703456a8d98f75a10639717"; // keep or replace with env var

export default function Recipe() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
          query
        )}&number=8&addRecipeInformation=true&apiKey=${API_KEY}`
      );
      setRecipes(res.data.results || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeDetails = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
      );
      setSelectedRecipe(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipe details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrap">
      {/* HERO - modeled after the provided image */}
      <header className="hero">
        <nav className="topbar">
          <div className="brand">
            <h1>FLAVOR<span>FIND</span></h1>
          </div>
          <ul className="top-links">
            <li><a href="#main">Recipe</a></li>
            <li className="icon"><img src="rrecipe.png" alt="avatar"/></li>
          </ul>
        </nav>

        <div className="hero-inner">
          <div className="hero-left">
            <h2 className="hero-title">
              Make Your <span className="accent">Dream Food</span><br/>With FlavorFind
            </h2>

            <div className="hero-stats">
              <div className="stat">
                <strong>5k+</strong>
                <small>Recipes</small>
              </div>

              <div className="stat">
                <strong>Spoonacular API</strong>
                <small>Used API from Spoonacular</small>
              </div>

              <div className="stat big">
                <div className="avatars">
                  <img src="https://spoonacular.com/application/frontend/images/logo-simple-framed-green-gradient.svg" alt="user" />
                </div>
                <div className="stat-text">
                  <strong>Visit Spoonacular for more info</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-circle">
              {/* Using the uploaded image as the model inside the orange circle */}
              <img className="model" src="main (1).jpg" alt="model" />

              {/* Floating food badges (replace src if you have specific icons) */}
              <img className="float food1" src="/main (4).jpg" alt="food" />
              <img className="float food2" src="/main (3).jpg" alt="food" />

              <div className="badge sushi">
                <div className="badge-inner">
                  <img src="/main (2).jpg" alt="sushi" />
                  <div className="badge-text">
                    <strong></strong>
                    <small>★ 4.2</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH + RECIPES */}
      <main id="main" className="content">
        <section className="search-section">
          <p className="kicker">Explore Recipes</p>
          <div className="search-row">
            <input
              type="search"
              placeholder="Search for steak, pasta, sushi..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchRecipes()}
            />
            <button className="search-btn" onClick={fetchRecipes}>Find</button>
          </div>

          {loading && <p className="loading">Loading deliciousness...</p>}
          {error && <p className="error">{error}</p>}
        </section>

        <section className="main-recipe">
          {recipes.length > 0 ? (
            <>
              <h5>Fan Favorites</h5>
              <div className="grid">
                {recipes.map((r) => (
                  <article className="recipe-card" key={r.id}>
                    <img src={r.image} alt={r.title} />
                    <div className="card-body">
                      <p className="title">{r.title}</p>
                      <button onClick={() => fetchRecipeDetails(r.id)}>View Recipe</button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <h5 className="start-hint">Start by searching for a recipe above!</h5>
          )}
        </section>

        {/* MODAL */}
       {selectedRecipe && (
  <div className="modal-overlay" onClick={() => setSelectedRecipe(null)}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      
      {/* Close Button */}
      <button className="modal-close-btn" onClick={() => setSelectedRecipe(null)}>
        &times;
      </button>

      {/* Title */}
      <h2 className="modal-title">{selectedRecipe.title}</h2>

      {/* Image */}
      <img 
        className="modal-image" 
        src={selectedRecipe.image} 
        alt={selectedRecipe.title} 
      />

      {/* Ingredients */}
      <h3 className="modal-section-title">Ingredients</h3>
      <ul className="modal-list">
        {selectedRecipe.extendedIngredients?.map((ing) => (
          <li key={ing.id || ing.name}>{ing.original}</li>
        ))}
      </ul>

      {/* Instructions */}
      <h3 className="modal-section-title">Instructions</h3>
      <div
        className="modal-text"
        dangerouslySetInnerHTML={{
          __html: selectedRecipe.instructions || "No instructions available."
        }}
      />

      {/* Nutrition */}
      <h3 className="modal-section-title">Nutrition</h3>

      {selectedRecipe.nutrition ? (
        <ul className="modal-nutrition">
          {selectedRecipe.nutrition.nutrients.slice(0, 6).map((n) => (
            <li key={n.name}>
              <strong>{n.name}</strong>: {n.amount}
              {n.unit}
            </li>
          ))}
        </ul>
      ) : (
        <p className="modal-text">No nutrition data available.</p>
      )}
    </div>
  </div>
)}
      </main>

      <footer className="site-footer">
        <div>© {new Date().getFullYear()} FlavorFind — Made For Foodies to try new Food</div>
  <a href="https://spoonacular.com/food-api" target="_blank">&copy; Credit to Spoonacular API</a>  
  </footer>
    </div>
  );
}