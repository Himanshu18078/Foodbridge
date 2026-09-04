import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const VolunteerDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = () => {
    setLoading(true);
    axiosInstance.get("/donations/accepted")
      .then((response) => {
        setDonations(response.data.content || []);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response?.data || "Failed to load donations");
        setLoading(false);
      });
  };

  const updateDonation = (id, action) => {
    axiosInstance.put(`/donations/${id}/${action}`)
      .then(() => {
        toast.success(`Donation ${action}ed successfully!`);
        fetchDonations();
      })
      .catch((error) => {
        toast.error(error.response?.data || `Failed to ${action} donation`);
      });
  };

  const getStatusBadge = (status) => {
    const styles = {
      ACCEPTED: "bg-yellow-100 text-yellow-800",
      PICKED_UP: "bg-blue-100 text-blue-800",
      DELIVERED: "bg-green-100 text-green-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">🚚 Accepted Donations</h1>
          <p className="text-gray-500 mt-1">View and manage donations assigned to you</p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100 flex flex-wrap items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-800">{donations.length}</span> donations
          </p>
          <div className="flex gap-3 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              Accepted
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-blue-400"></span>
              Picked Up
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
              Delivered
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : donations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-500 text-lg">No accepted donations yet</p>
            <p className="text-gray-400 text-sm mt-1">Check back later for new assignments</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200 flex flex-col"
              >
                {/* Image */}
                {donation.imageUrl && (
                  <img
                    src={`http://localhost:8080/uploads/${donation.imageUrl}`}
                    alt={donation.foodName}
                    className="w-full h-48 object-cover"
                  />
                )}

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">{donation.foodName}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(donation.status)}`}>
                      {donation.status}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="font-medium w-20">Quantity:</span>
                      <span>{donation.quantity} units</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium w-20">Pickup:</span>
                      <span className="flex-1">{donation.pickupAddress}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                    {donation.status === 'ACCEPTED' && (
                      <button
                        onClick={() => updateDonation(donation.id, 'pickup')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors duration-200"
                      >
                        📦 Pickup
                      </button>
                    )}
                    {donation.status === 'PICKED_UP' && (
                      <button
                        onClick={() => updateDonation(donation.id, 'deliver')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors duration-200"
                      >
                        ✅ Deliver
                      </button>
                    )}
                    {donation.status === 'DELIVERED' && (
                      <div className="flex-1 text-center text-sm text-gray-400 py-2">
                        ✅ Delivered
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;