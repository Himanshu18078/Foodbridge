import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const DonorDashboard = () => {
  // Create Donation States
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // My Donations States
  const [myDonations, setMyDonations] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(true);

  useEffect(() => {
    fetchMyDonations();
  }, []);

  // Fetch My Donations
  const fetchMyDonations = () => {
    setLoadingDonations(true);
    axiosInstance.get("/donations/my-donations")
      .then((response) => {
        setMyDonations(response.data || []);
        setLoadingDonations(false);
      })
      .catch((error) => {
        toast.error(error.response?.data || "Failed to load your donations");
        setLoadingDonations(false);
      });
  };

  // Create Donation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("foodName", foodName);
    formData.append("quantity", quantity);
    formData.append("pickupAddress", pickupAddress);
    formData.append("expiryTime", expiryDate + " 00:00:00");
    formData.append("image", image);

    setLoading(true);
    axiosInstance.post("/donations", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        toast.success("Donation created successfully!");
        setLoading(false);
        setFoodName("");
        setQuantity("");
        setExpiryDate("");
        setPickupAddress("");
        setImage(null);
        document.getElementById("imageInput").value = "";
        fetchMyDonations(); // Refresh list
      })
      .catch((err) => {
        toast.error(err.response?.data || "Failed to create donation");
        setLoading(false);
      });
  };

  const getStatusBadge = (status) => {
    const styles = {
      AVAILABLE: "bg-green-100 text-green-800",
      ACCEPTED: "bg-yellow-100 text-yellow-800",
      PICKED_UP: "bg-blue-100 text-blue-800",
      DELIVERED: "bg-gray-100 text-gray-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">🍱 Donor Dashboard</h1>
          <p className="text-gray-500 mt-1">Create and manage your food donations</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Column — Create Donation Form */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Donation</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Food Name *</label>
                  <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g., Rice & Curry"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                    <input
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address *</label>
                  <textarea
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    rows="2"
                    placeholder="Enter complete pickup address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image *</label>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    required
                  />
                  {image && (
                    <p className="text-xs text-green-600 mt-1">✅ {image.name} selected</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Donation"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column — My Donations List */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">📦 My Donations</h2>

              {loadingDonations ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : myDonations.length === 0 ? (
                <p className="text-gray-400 text-center py-6">You haven't created any donations yet</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {myDonations.map((donation) => (
                    <div key={donation.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-800">{donation.foodName}</p>
                          <p className="text-sm text-gray-500">Qty: {donation.quantity}</p>
                          <p className="text-xs text-gray-400 mt-1">{donation.pickupAddress}</p>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(donation.status)}`}>
                          {donation.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;