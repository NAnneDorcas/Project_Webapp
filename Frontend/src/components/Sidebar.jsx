import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Home, ShoppingCart, Shield, Headphones } from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="brand">
        <ShoppingBag size={30} />
        <span>SmartStore</span>
      </div>

      <nav className="side-nav">
        <Link className={isActive("/") ? "active" : ""} to="/">
          <Home size={20} /> Home
        </Link>

        <Link className={isActive("/cart") ? "active" : ""} to="/cart">
          <ShoppingCart size={20} /> Cart
        </Link>

        <Link className={isActive("/admin/products") ? "active" : ""} to="/admin/products">
          <Shield size={20} /> Admin
        </Link>
      </nav>

      <div className="help-card">
        <Headphones size={34} />
        <h4>Need Help?</h4>
        <p>Contact customer service for support.</p>
      </div>
    </aside>
  );
}

export default Sidebar;