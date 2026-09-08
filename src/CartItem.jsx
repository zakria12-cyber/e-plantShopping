import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "./CartSlice";

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

        <div>
          <a href="/">Home</a>
          <a href="#plants">Plants</a>
          <a href="#cart">🛒 Cart</a>
        </div>
      </nav>

      <section className="cart-page">
        <h2>Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty.</h3>
            <a href="#plants">
              <button>Continue Shopping</button>
            </a>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-details">
                  <h3>{item.name}</h3>

                  <p>Unit Price: ${item.price}</p>

                  <p>
                    Total: ${item.price * item.quantity}
                  </p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="delete-button"
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <h2>Total Amount: ${totalAmount}</h2>

              <button
                onClick={() => alert("Checkout Coming Soon!")}
              >
                Checkout
              </button>

              <a href="#plants">
                <button>Continue Shopping</button>
              </a>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default CartItem;