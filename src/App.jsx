import { useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./AboutUs";

function App() {
  const [page, setPage] = useState("home");

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <nav className="navbar">
        <h1>🌿 Paradise Nursery</h1>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>

          <button onClick={() => setPage("plants")}>Plants</button>

          <button onClick={() => setPage("cart")}>
            🛒 Cart ({cartCount})
          </button>
        </div>
      </nav>

      {page === "home" && (
        <section className="hero">
          <div className="hero-content">
            <h2>Welcome to Paradise Nursery</h2>

            <p>
              Bring nature into your home with our beautiful
              collection of houseplants.
            </p>

            <button
              className="get-started"
              onClick={() => setPage("plants")}
            >
              Get Started
            </button>
          </div>
        </section>
      )}

      {page === "plants" && (
        <ProductList />
      )}

      {page === "cart" && (
        <CartItem />
      )}

      {page === "home" && (
        <AboutUs />
      )}
    </div>
  );
}

export default App;