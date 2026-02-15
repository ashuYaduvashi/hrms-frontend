import { useState } from "react";
import api from "../api/api";

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await api.post("/leaves/apply", formData);
      setMessage("Leave applied successfully ");
      console.log(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error applying leave ");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Apply for Leave</h2>

      {message && (
        <div className="mb-4 text-center text-sm text-blue-600">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block mb-1 font-medium">Leave Type</label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          >
            <option value="">Select Leave Type</option>
            <option value="SICK">SICK</option>
            <option value="CASUAL">CASUAL</option>
            <option value="ANNUAL">ANNUAL</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Apply Leave
        </button>
      </form>
    </div>
  );
};

export default ApplyLeave;
