import { useEffect, useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import API from "../api/api";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});

  const loadProducts = async () => {
    const response = await API.get("/products");
    setProducts(response.data);
  };

  const handleQuantityChange = (productId, value, maxStock) => {
    let quantity = Number(value);

    if (quantity < 1) quantity = 1;
    if (quantity > maxStock) quantity = maxStock;

    setQuantities({
      ...quantities,
      [productId]: quantity,
    });
  };

  const addToCart = async (product) => {
    const quantity = quantities[product.id] || 1;

    await API.post("/cart/items", {
      productId: product.id,
      quantity,
    });

    alert(`${quantity} item(s) added to cart`);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const featured = products[0];

  const getStockLabel = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 5) return "Low Stock";
    return "In Stock";
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Online Store</h1>
          <p>Browse our collection and find the best products for you.</p>
        </div>

        <div className="search-box">
          <Search size={18} />
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {featured && (
        <section className="hero-card">
          <div>
            <span className="badge">Featured Product</span>
            <h2>{featured.name}</h2>
            <p>{featured.description}</p>
            <h3>€{featured.price}</h3>
          </div>

          <div className="hero-icon">🛍️</div>
        </section>
      )}

      <h2 className="section-title">Popular Products</h2>

      <div className="product-grid">
        {filteredProducts.map((product) => {
          const isOutOfStock = product.stockQuantity === 0;
          const quantity = quantities[product.id] || 1;

          return (
            <div className="product-card" key={product.id}>
              <div className="product-image">🛍️</div>

              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <strong>€{product.price}</strong>

              <span
                className={
                  isOutOfStock
                    ? "stock-status stock-out"
                    : product.stockQuantity <= 5
                    ? "stock-status stock-low"
                    : "stock-status stock-in"
                }
              >
                {getStockLabel(product.stockQuantity)}{" "}
                {!isOutOfStock && `(${product.stockQuantity} available)`}
              </span>

              <div className="quantity-row">
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  max={product.stockQuantity}
                  value={quantity}
                  disabled={isOutOfStock}
                  onChange={(e) =>
                    handleQuantityChange(
                      product.id,
                      e.target.value,
                      product.stockQuantity
                    )
                  }
                />
              </div>

              <button
                className="add-cart-btn"
                onClick={() => addToCart(product)}
                disabled={isOutOfStock}
              >
                <ShoppingCart size={18} />
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductsPage;