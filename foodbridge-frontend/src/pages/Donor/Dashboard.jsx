import { useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

const DonorDashboard = () => {
  useEffect(() => {
    // Test with a real DONOR endpoint
    axiosInstance.post("/donations", {
      foodName: "Test Food",
      quantity: 5,
      expiryDate: "2025-12-31",
      description: "Test donation"
    })
    .then(res => {
      console.log("✅ Success:", res.data);
    })
    .catch(err => {
      console.log("❌ Status:", err.response?.status);
      console.log("❌ Error:", err.response?.data);
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Donor Dashboard</h1>
    </div>
  );
};

export default DonorDashboard;