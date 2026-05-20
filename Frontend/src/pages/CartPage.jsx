import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import API from "../api/api";

function CartPage() {
  const [cart, setCart] = useState(null);

  const loadCart = async () => {
    const response = await API.get("/cart");
    setCart(response.data);
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    await API.put(`/cart/items/${itemId}?quantity=${quantity}`);
    loadCart();
  };

  const removeItem = async (itemId) => {
    await API.delete(`/cart/items/${itemId}`);
    loadCart();
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (!cart) return <p>Loading cart...</p>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Shopping Cart</h1>
          <p>Review your items before checkout.</p>
        </div>
      </div>

      {cart.items.length === 0 ? (
        <div className="empty-card">
          <h3>Your cart is empty.</h3>
          <Link to="/" className="primary-link">Go Shopping</Link>
        </div>
      ) : (
        <div className="admin-card">
          <table className="clean-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>€{item.product.price}</td>
                  <td>
                    <input
                      className="qty-input"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                    />
                  </td>
                  <td>€{(item.product.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-total">
            <h2>Total: €{total.toFixed(2)}</h2>
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;