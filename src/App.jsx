import { useState } from "react";
import "./App.css";

function App() {
  const plants = [
    {
      id: 1,
      name: "Snake Plant",
      description: "A beautiful and easy-to-care-for indoor plant.",
      price: 15,
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee"
    },
    {
      id: 2,
      name: "Peace Lily",
      description: "A beautiful plant with attractive white flowers.",
      price: 20,
      image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6"
    },
    {
      id: 3,
      name: "Aloe Vera",
      description: "A useful and low-maintenance succulent plant.",
      price: 12,
      image: "https://images.unsplash.com/photo-1596547609652-9cf5d8c3e515"
    },
    {
      id: 4,
      name: "Spider Plant",
      description: "A popular indoor plant that is easy to grow.",
      price: 18,
      image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333"
    },
    {
      id: 5,
      name: "Monstera",
      description: "A tropical plant with large, beautiful leaves.",
      price: 25,
      image: "https://images.unsplash.com/photo-1614594575784-0e68b0e38c5b"
    },
    {
      id: 6,
      name: "Cactus",
      description: "A small and attractive plant requiring little water.",
      price: 10,
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc"
    }
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (plant) => {
    const existingPlant = cart.find((item) => item.id === plant.id);

    if (existingPlant) {
      setCart(
        cart.map((item) =>
          item.id === plant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...plant, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <nav>
        <h1>🌿 Paradise Nursery</h1>

        <div className="nav-links">
          <a href="#plants">Plants</a>
          <a href="#cart">Cart 🛒 ({totalItems})</a>
        </div>
      </nav>

      <header>
        <h2>Welcome to Paradise Nursery</h2>
        <p>Find the perfect plants for your home and garden.</p>
      </header>

      <main>
        <section id="plants">
          <h2>Our Plants</h2>

          <div className="plant-container">
            {plants.map((plant) => (
              <div className="plant-card" key={plant.id}>
                <img src={plant.image} alt={plant.name} />

                <h3>{plant.name}</h3>

                <p>{plant.description}</p>

                <h4>${plant.price}</h4>

                <button onClick={() => addToCart(plant)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="cart" className="cart">
          <h2>🛒 Shopping Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <p>Price: ${item.price}</p>

                    <div className="quantity">
                      <button onClick={() => decreaseQuantity(item.id)}>
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4>${item.price * item.quantity}</h4>

                    <button
                      className="remove"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <h2>Total: ${totalPrice}</h2>

              <button
                className="checkout"
                onClick={() => alert("Thank you for shopping!")}
              >
                Checkout
              </button>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;