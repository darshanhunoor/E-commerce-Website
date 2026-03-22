// User Profile page
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI, orderAPI } from '../api/api';

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getUserProfile();
      setProfile(response.data.user);
      setFormData(response.data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getUserOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      await userAPI.updateUserProfile(formData);
      setProfile(formData);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>

            {editing ? (
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Postcode</label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm">Name</p>
                  <p className="text-gray-900 font-semibold">{profile?.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="text-gray-900 font-semibold">{profile?.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Phone</p>
                  <p className="text-gray-900 font-semibold">{profile?.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Address</p>
                  <p className="text-gray-900 font-semibold">{profile?.address || 'Not provided'}</p>
                </div>
                <button
                  onClick={() => setEditing(true)}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold mt-4"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          {/* Orders */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>

            {orders.length === 0 ? (
              <p className="text-gray-600">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-gray-600 text-sm">Order ID</p>
                        <p className="font-semibold">{order._id.substring(0, 8)}...</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded font-semibold text-sm ${
                          order.orderStatus === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.orderStatus === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600 text-sm">Items: {order.orderItems.length}</p>
                        <p className="font-semibold text-lg">${order.totalAmount.toFixed(2)}</p>
                      </div>
                      <button className="text-blue-600 hover:underline font-semibold">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
