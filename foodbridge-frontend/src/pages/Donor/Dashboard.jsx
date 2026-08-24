import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const DonorDashboard = () => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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

    axiosInstance
      .post("/donations", formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
      })
      .catch((err) => {
        console.log("=== FULL ERROR RESPONSE ===");
        console.log("Status:", err.response?.status);
        console.log("Headers:", err.response?.headers);
        console.log("Data:", err.response?.data);
        console.log("Config:", err.config);
        console.log("Full error object:", err);
        toast.error(err.response?.data || "Failed to create donation");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">🍱 Create Donation</h1>
          <p className="text-gray-500 mt-1">Share food with those in need</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Food Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Food Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="e.g., Rice & Curry"
                required
              />
            </div>

            {/* Quantity & Expiry Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="e.g., 10"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Pickup Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pickup Address <span className="text-red-500">*</span>
              </label>
              <textarea
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                rows="2"
                placeholder="Enter complete pickup address"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Image <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg border border-gray-300 transition">
                  Choose File
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="hidden"
                    required
                  />
                </label>
                <span className="text-sm text-gray-500">
                  {image ? image.name : "No file chosen"}
                </span>
              </div>
              {image && (
                <p className="text-xs text-green-600 mt-1">
                  ✅ {image.name} selected ({Math.round(image.size / 1024)} KB)
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Donation"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;