import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const NgoDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = () => {
    setLoading(true);
    axiosInstance.get("/donations/available")
      .then((response) => {
        setDonations(response.data.content || []);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response?.data || "Failed to load donations");
        setLoading(false);
      });
  };

  const acceptDonation = (id) => {
    axiosInstance.put(`/donations/${id}/accept`)
      .then(() => {
        toast.success("Donation accepted!");
        fetchDonations();
      })
      .catch((error) => {
        toast.error(error.response?.data || "Failed to accept donation");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">📦 Available Donations</h1>
          <p className="text-gray-500 mt-1">Browse and accept food donations from donors</p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-800">{donations.length}</span> available donations
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : donations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <p className="text-gray-500 text-lg">🎉 No donations available right now</p>
            <p className="text-gray-400 text-sm mt-1">Check back later for new donations</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <div key={donation.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                {/* Image */}
                {donation.imageUrl && (
                  <img
                    src={`http://localhost:8080/uploads/${donation.imageUrl}`}
                    alt={donation.foodName}
                    className="w-full h-48 object-cover"
                  />
                )}

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800">{donation.foodName}</h2>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium w-20">Quantity:</span>
                      <span>{donation.quantity} units</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium w-20">Expiry:</span>
                      <span className="text-orange-600">{donation.expiryTime}</span>
                    </div>
                    <div className="flex items-start text-sm text-gray-600">
                      <span className="font-medium w-20">Pickup:</span>
                      <span className="flex-1">{donation.pickupAddress}</span>
                    </div>
                  </div>

                  {/* Accept Button */}
                  <button
                    onClick={() => acceptDonation(donation.id)}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
                  >
                    Accept Donation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NgoDashboard;