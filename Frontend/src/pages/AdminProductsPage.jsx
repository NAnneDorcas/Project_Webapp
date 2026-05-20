import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, RefreshCw, Search } from "lucide-react";
import API from "../api/api";

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    categoryId: "",
  });

  const loadData = async () => {
    const productsResponse = await API.get("/products");
    const categoriesResponse = await API.get("/categories");
    setProducts(productsResponse.data);
    setCategories(categoriesResponse.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const editProduct = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      categoryId: product.category?.id || "",
    });

    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    const data = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      stockQuantity: Number(form.stockQuantity),
      categoryId: Number(form.categoryId),
    };

    if (form.id) {
      await API.put(`/products/${form.id}`, data);
    } else {
      await API.post("/products", data);
    }

    setForm({
      id: null,
      name: "",
      description: "",
      price: "",
      stockQuantity: "",
      categoryId: "",
    });

    loadData();
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    loadData();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Admin - Products</h1>
          <p>Manage your store products.</p>
        </div>

        <div className="admin-actions">
          <div className="search-box">
            <Search size={18} />
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="refresh-btn" onClick={loadData}>
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      <div className="admin-card">
        <table className="clean-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category?.name}</td>
                <td>€{product.price}</td>
                <td>{product.stockQuantity}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => editProduct(product)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form className="product-form" onSubmit={saveProduct}>
        <h2>{form.id ? "Update Product" : "Add New Product"}</h2>

        <div className="form-grid">
          <input
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="stockQuantity"
            type="number"
            placeholder="Stock"
            value={form.stockQuantity}
            onChange={handleChange}
            required
          />

          <button type="submit">
            <Plus size={18} />
            {form.id ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductsPage;