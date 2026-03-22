// Product Details page
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI } from '../api/api';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(id);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProductById(id);
      setProduct(response.data.product);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Product added to cart!');
    setQuantity(1);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <img
              src={product.image || '/placeholder.jpg'}
              alt={product.name}
              className="max-w-full h-auto rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-yellow-400 text-xl">⭐ {product.rating || 0}</span>
              </div>
              <span className="text-gray-600">Category: {product.category}</span>
            </div>

            <p className="text-gray-700 text-lg mb-6">{product.description}</p>

            {/* Price and Stock */}
            <div className="flex items-center gap-8 mb-6">
              <div>
                <span className="text-gray-600">Price:</span>
                <p className="text-4xl font-bold text-blue-600">${product.price}</p>
              </div>
              <div>
                <span className="text-gray-600">Stock:</span>
                <p
                  className={`text-2xl font-bold ${
                    product.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} Available` : 'Out of Stock'}
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <label className="text-gray-700 font-semibold">Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-3 rounded-lg font-bold text-white transition ${
                  product.stock > 0
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>

              <button
                onClick={handleAddToWishlist}
                className={`px-6 py-3 rounded-lg font-bold transition ${
                  inWishlist
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {inWishlist ? '❤️ Saved' : '🤍 Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
