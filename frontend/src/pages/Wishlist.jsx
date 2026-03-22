// Wishlist page
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
          <p className="text-gray-600 mb-8">Your wishlist is empty</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="w-full mt-2 text-red-600 hover:text-red-800 font-semibold py-2 border border-red-600 rounded"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
