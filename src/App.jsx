import { useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./AboutUs";

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleGetStartedClick = () => {
    setShowProductList(true);
    setShowCart(false);
  };

  const handlePlantsClick = () => {
    setShowProductList(true);
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowCart(true);
    setShowProductList(false);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
    setShowCart(false);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <button className="brand-button" onClick={handleHomeClick}>
          🌿 Paradise Nursery
        </button>
        <div className="nav-links">
          <button onClick={handleHomeClick}>Home</button>
          <button onClick={handlePlantsClick}>Plants</button>
          <button onClick={handleCartClick}>🛒 Cart ({cartCount})</button>
        </div>
      </nav>

      {!showProductList && !showCart && (
        <>
          <section className="hero background-image">
            <div className="hero-content">
              <h1>Welcome to Paradise Nursery</h1>
              <p>Discover beautiful plants and bring the freshness of nature into your home.</p>
              <button className="get-started" onClick={handleGetStartedClick}>
                Get Started
              </button>
            </div>
          </section>
          <AboutUs />
        </>
      )}

      {showProductList && <ProductList />}
      {showCart && <CartItem />}
    </div>
  );
}

export default App;
