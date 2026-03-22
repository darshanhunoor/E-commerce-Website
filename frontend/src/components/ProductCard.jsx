// Product Card component
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart(product, 1);
    alert('Product added to cart!');
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      {/* Product Image */}
      <div className="relative bg-gray-200 h-48 overflow-hidden">
        <img
          src={product.image || '/placeholder.jpg'}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition duration-300"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={handleAddToWishlist}
            className={`${
              inWishlist ? 'bg-red-500' : 'bg-gray-200'
            } rounded-full p-2 hover:scale-110 transition`}
          >
            {inWishlist ? '❤️' : '🤍'}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link
          to={`/product/${product._id}`}
          className="text-lg font-semibold text-gray-800 hover:text-blue-600"
        >
          {product.name}
        </Link>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">⭐ {product.rating || 0}</span>
        </div>

        {/* Price and Stock */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-blue-600">${product.price}</span>
          <span
            className={`text-sm ${
              product.stock > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full mt-4 py-2 rounded font-semibold transition ${
            product.stock > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
