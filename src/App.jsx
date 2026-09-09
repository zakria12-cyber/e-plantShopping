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

  const renderPage = () => {
    if (page === "plants") {
      return <ProductList />;
    }

    if (page === "cart") {
      return <CartItem />;
    }

    return (
      <>
        <section className="hero">
          <div className="hero-content">
            <h2>Paradise Nursery</h2>
            <p>
              Discover beautiful plants and bring the freshness of nature into
              your home.
            </p>
            <button className="get-started" onClick={() => setPage("plants")}>
              Get Started
            </button>
          </div>
        </section>
        <AboutUs />
      </>
    );
  };

  return (
    <div className="app">
      <nav className="navbar">
        <button className="brand-button" onClick={() => setPage("home")}>
          🌿 Paradise Nursery
        </button>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("plants")}>Plants</button>
          <button onClick={() => setPage("cart")}>
            🛒 Cart ({cartCount})
          </button>
        </div>
      </nav>

      {renderPage()}
    </div>
  );
}

export default App;
