import { useSelector, useDispatch } from "react-redux";
import { addItem } from "./CartSlice";

const plants = [
  { id: 1, name: "Snake Plant", price: 15, category: "Air Purifying", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee" },
  { id: 2, name: "Peace Lily", price: 20, category: "Air Purifying", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6" },
  { id: 3, name: "Spider Plant", price: 18, category: "Air Purifying", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333" },
  { id: 4, name: "Boston Fern", price: 22, category: "Air Purifying", image: "https://images.unsplash.com/photo-1620803366004-119ba7f1f682" },
  { id: 5, name: "Rubber Plant", price: 24, category: "Air Purifying", image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85" },
  { id: 6, name: "Bamboo Palm", price: 26, category: "Air Purifying", image: "https://images.unsplash.com/photo-1597055181300-d0a0c1a7c1a3" },
  { id: 7, name: "Aloe Vera", price: 12, category: "Succulents", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8c3e515" },
  { id: 8, name: "Cactus", price: 10, category: "Succulents", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc" },
  { id: 9, name: "Jade Plant", price: 14, category: "Succulents", image: "https://images.unsplash.com/photo-1566946878377-7d7f8a1e3f1a" },
  { id: 10, name: "Echeveria", price: 13, category: "Succulents", image: "https://images.unsplash.com/photo-1534710961216-75c88202f43e" },
  { id: 11, name: "Haworthia", price: 16, category: "Succulents", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09" },
  { id: 12, name: "Zebra Haworthia", price: 17, category: "Succulents", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09" },
  { id: 13, name: "Monstera", price: 25, category: "Tropical Plants", image: "https://images.unsplash.com/photo-1614594575784-0e68b0e38c5b" },
  { id: 14, name: "Calathea", price: 23, category: "Tropical Plants", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b" },
  { id: 15, name: "Bird of Paradise", price: 30, category: "Tropical Plants", image: "https://images.unsplash.com/photo-1597055181300-d0a0c1a7c1a3" },
  { id: 16, name: "Philodendron", price: 27, category: "Tropical Plants", image: "https://images.unsplash.com/photo-1545165375-3b0b7c1f5a0a" },
  { id: 17, name: "Fiddle Leaf Fig", price: 32, category: "Tropical Plants", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09" },
  { id: 18, name: "Areca Palm", price: 28, category: "Tropical Plants", image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6" },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const categories = ["Air Purifying", "Succulents", "Tropical Plants"];

  return (
    <section className="products">
      <div className="product-navbar">
        <h2>Paradise Nursery Plants</h2>
        <div className="cart-indicator">🛒 Cart ({cartQuantity})</div>
      </div>
      {categories.map((category) => (
        <div key={category}>
          <h3 className="category-title">{category}</h3>
          <div className="plant-grid">
            {plants.filter((plant) => plant.category === category).map((plant) => {
              const cartItem = cartItems.find((item) => item.id === plant.id);
              return (
                <div className="plant-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>${plant.price}</p>
                  <button
                    disabled={Boolean(cartItem)}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {cartItem ? `Added (${cartItem.quantity})` : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

export default ProductList;
