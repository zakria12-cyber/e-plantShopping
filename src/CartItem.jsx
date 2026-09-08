import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <nav className="navbar">
        <h1>🌿 Paradise Nursery</h1>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#plants">Plants</a>
          <a href="#cart">🛒 Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})</a>
        </div>
      </nav>

      <section className="cart-page">
        <h2>Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty.</h3>
            <a href="#plants"><button>Continue Shopping</button></a>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.price}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    >−</button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    >+</button>
                  </div>

                  <button
                    className="delete-button"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
              <button onClick={() => alert("Checkout Coming Soon!")}>Checkout</button>
              <a href="#plants"><button>Continue Shopping</button></a>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default CartItem;
