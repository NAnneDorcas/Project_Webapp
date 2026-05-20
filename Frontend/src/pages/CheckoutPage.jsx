import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag } from "lucide-react";
import API from "../api/api";

function CheckoutPage() {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const checkout = async () => {
    try {
      setError("");
      const response = await API.post("/orders/checkout");
      setOrder(response.data);
    } catch (err) {
      setError("Checkout failed. Make sure your cart is not empty.");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Checkout</h1>
          <p>Confirm your order and complete your purchase.</p>
        </div>
      </div>

      <div className="checkout-card">
        {!order ? (
          <>
            <div className="checkout-icon">
              <ShoppingBag size={48} />
            </div>

            <h2>Ready to place your order?</h2>
            <p>
              Your items will be checked for available stock before the order is
              created.
            </p>

            {error && <div className="error-message">{error}</div>}

            <button className="checkout-confirm-btn" onClick={checkout}>
              Confirm Order
            </button>

            <Link to="/cart" className="back-link">
              Back to Cart
            </Link>
          </>
        ) : (
          <>
            <div className="success-icon">
              <CheckCircle size={58} />
            </div>

            <h2>{order.message}</h2>

            <div className="order-summary">
              <p>
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p>
                <strong>Total Price:</strong> €{order.totalPrice}
              </p>
            </div>

            <Link to="/" className="checkout-confirm-btn">
              Continue Shopping
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;