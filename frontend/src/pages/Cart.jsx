// Cart page
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-gray-600 mb-8">Your cart is empty</p>
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
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Product</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Price</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Quantity</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Total</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.productId} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image || '/placeholder.jpg'}
                            alt={item.productName}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{item.productName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">${item.price}</td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.productId, Math.max(1, parseInt(e.target.value)))
                          }
                          className="w-16 px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Clear Cart
                </button>
                <Link
                  to="/"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="h-fit">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-semibold">${(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xl">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-blue-600">
                    ${(getCartTotal() * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full block text-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
