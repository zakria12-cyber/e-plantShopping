import { useState } from "react";

const initialRecipes = [
  {
    id: 1,
    name: "Chicken Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80",
    description: "A fragrant and spicy rice dish with tender chicken.",
    ingredients: ["Basmati rice", "Chicken", "Onion", "Spices", "Yogurt"],
    favorite: false,
  },
  {
    id: 2,
    name: "Creamy Pasta",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
    description: "Creamy pasta with herbs, vegetables, and cheese.",
    ingredients: ["Pasta", "Cream", "Garlic", "Cheese", "Herbs"],
    favorite: false,
  },
  {
    id: 3,
    name: "Classic Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    description: "A juicy homemade burger with fresh toppings.",
    ingredients: ["Burger bun", "Patty", "Cheese", "Lettuce", "Tomato"],
    favorite: false,
  },
];

function App() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [page, setPage] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", ingredients: "" });

  const toggleFavorite = (id) => {
    setRecipes((current) =>
      current.map((recipe) =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      )
    );
  };

  const openRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setPage("details");
  };

  const addRecipe = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.description.trim()) return;

    const recipe = {
      id: Date.now(),
      name: form.name,
      description: form.description,
      ingredients: form.ingredients.split(",").map((item) => item.trim()).filter(Boolean),
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80",
      favorite: false,
      userRecipe: true,
    };

    setRecipes((current) => [...current, recipe]);
    setForm({ name: "", description: "", ingredients: "" });
    setPage("myrecipes");
  };

  const deleteRecipe = (id) => {
    setRecipes((current) => current.filter((recipe) => recipe.id !== id));
    if (selectedRecipe?.id === id) {
      setSelectedRecipe(null);
      setPage("myrecipes");
    }
  };

  const favorites = recipes.filter((recipe) => recipe.favorite);
  const myRecipes = recipes.filter((recipe) => recipe.userRecipe);

  const RecipeGrid = ({ items, emptyMessage, showDelete = false }) => (
    <div className="recipe-grid">
      {items.length ? items.map((recipe) => (
        <article className="recipe-card" key={recipe.id}>
          <img src={recipe.image} alt={recipe.name} />
          <div className="card-content">
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <div className="card-actions">
              <button onClick={() => openRecipe(recipe)}>View Recipe</button>
              <button className="favorite-button" onClick={() => toggleFavorite(recipe.id)}>
                {recipe.favorite ? "❤️ Saved" : "🤍 Favorite"}
              </button>
              {showDelete && <button className="delete-button" onClick={() => deleteRecipe(recipe.id)}>Delete</button>}
            </div>
          </div>
        </article>
      )) : <p className="empty-message">{emptyMessage}</p>}
    </div>
  );

  return (
    <div className="app">
      <header className="navbar">
        <button className="brand" onClick={() => setPage("home")}>🍴 Foodie</button>
        <nav className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("add")}>Add Recipe</button>
          <button onClick={() => setPage("favorites")}>Favorites ({favorites.length})</button>
          <button onClick={() => setPage("myrecipes")}>My Recipes</button>
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <section className="hero">
              <div>
                <span className="eyebrow">DISCOVER • COOK • ENJOY</span>
                <h1>Find your next favorite meal.</h1>
                <p>Browse delicious recipes, save your favorites, and share your own creations.</p>
                <button onClick={() => setPage("add")}>Create a Recipe</button>
              </div>
            </section>
            <section className="content-section">
              <div className="section-heading"><h2>Popular Recipes</h2><p>Explore delicious ideas from the Foodie kitchen.</p></div>
              <RecipeGrid items={recipes} emptyMessage="No recipes available yet." />
            </section>
          </>
        )}

        {page === "details" && selectedRecipe && (
          <section className="details content-section">
            <button className="back-button" onClick={() => setPage("home")}>← Back to recipes</button>
            <img src={selectedRecipe.image} alt={selectedRecipe.name} />
            <div className="details-text">
              <h2>{selectedRecipe.name}</h2>
              <p>{selectedRecipe.description}</p>
              <h3>Ingredients</h3>
              <ul>{selectedRecipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
              <button onClick={() => toggleFavorite(selectedRecipe.id)}>
                {selectedRecipe.favorite ? "❤️ Remove Favorite" : "🤍 Save Favorite"}
              </button>
            </div>
          </section>
        )}

        {page === "add" && (
          <section className="form-container content-section">
            <h2>Add Your Recipe</h2>
            <p>Share a delicious recipe with your Foodie collection.</p>
            <form onSubmit={addRecipe}>
              <label>Recipe Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Spicy Chicken Pasta" /></label>
              <label>Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Tell us about your recipe" /></label>
              <label>Ingredients<input value={form.ingredients} onChange={(e) => setForm({ ...form, ingredients: e.target.value })} placeholder="Chicken, pasta, garlic, cream" /></label>
              <button type="submit">Add Recipe</button>
            </form>
          </section>
        )}

        {page === "favorites" && <section className="content-section"><h2>❤️ Your Favorites</h2><RecipeGrid items={favorites} emptyMessage="You have not saved any recipes yet." /></section>}
        {page === "myrecipes" && <section className="content-section"><h2>👨‍🍳 My Recipes</h2><RecipeGrid items={myRecipes} emptyMessage="You have not added any recipes yet." showDelete /></section>}
      </main>

      <footer>© 2026 Foodie — Made for people who love great food.</footer>
    </div>
  );
}

export default App;
