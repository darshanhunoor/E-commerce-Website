// Admin Dashboard - Statistics and Management
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI, productAPI, orderAPI } from '../api/api';

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardData();
    }
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, productsRes, ordersRes] = await Promise.all([
        userAPI.getDashboardStats(),
        productAPI.getAllProducts(),
        orderAPI.getAllOrders(),
      ]);

      setStats(statsRes.data.stats);
      setProducts(productsRes.data.products);
      setOrders(ordersRes.data.orders);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 text-sm font-semibold">Total Users</h3>
              <p className="text-4xl font-bold text-blue-600 mt-2">{stats?.totalUsers || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 text-sm font-semibold">Total Products</h3>
              <p className="text-4xl font-bold text-green-600 mt-2">{stats?.totalProducts || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 text-sm font-semibold">Total Orders</h3>
              <p className="text-4xl font-bold text-purple-600 mt-2">{stats?.totalOrders || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 text-sm font-semibold">Total Revenue</h3>
              <p className="text-4xl font-bold text-orange-600 mt-2">
                ${stats?.totalRevenue?.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === 'stats'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === 'products'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === 'orders'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Orders ({orders.length})
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Product Name</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Category</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Price</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{product.name}</td>
                    <td className="px-6 py-4 text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 text-gray-600">${product.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded ${
                          product.stock > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Order ID</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Total Amount</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-gray-700 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{order._id.substring(0, 8)}...</td>
                    <td className="px-6 py-4 text-gray-600">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          order.orderStatus === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.orderStatus === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
