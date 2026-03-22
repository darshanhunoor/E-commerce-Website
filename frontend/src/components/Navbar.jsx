// Navbar component
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            ShopHub
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>

            {/* Admin Dashboard */}
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-blue-600">
                Admin
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
              🛒 Cart
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="text-gray-700 hover:text-blue-600">
              ❤️ Wishlist
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{user?.name}</span>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 border border-gray-300 px-4 py-2 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
