import React, { useState } from "react";
import axios from "axios";

const LeaveRequestForm = () => {


  const API_URL = "http://localhost:8080/api/leaves";

  const [leave, setLeave] = useState({
    employee: {
      id: ""
    },
    leaveType: "CASUAL",
    startDate: "",
    endDate: "",
    daysRequested: 0,
    reason: "",
    leaveStatus: "PENDING"
  });

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "employeeId") {
      setLeave({
        ...leave,
        employee: { id: value }
      });
    } 
    else if (name === "startDate" || name === "endDate") {
      const updatedLeave = {
        ...leave,
        [name]: value
      };

      updatedLeave.daysRequested = calculateDays(
        name === "startDate" ? value : leave.startDate,
        name === "endDate" ? value : leave.endDate
      );

      setLeave(updatedLeave);
    } 
    else {
      setLeave({
        ...leave,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, leave);
      alert("Leave Request Submitted ");
      console.log(response.data);

      setLeave({
        employee: { id: "" },
        leaveType: "CASUAL",
        startDate: "",
        endDate: "",
        daysRequested: 0,
        reason: "",
        leaveStatus: "PENDING"
      });

    } catch (error) {
      console.error(error);
      alert("Error submitting leave ");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-2xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
        Apply Leave
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

      
        <div>
          <label className="block font-semibold mb-1">Employee ID</label>
          <input
            type="number"
            name="employeeId"
            value={leave.employee.id}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

       
        <div>
          <label className="block font-semibold mb-1">Leave Type</label>
          <select
            name="leaveType"
            value={leave.leaveType}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="CASUAL">CASUAL</option>
            <option value="SICK">SICK</option>
            <option value="PAID">PAID</option>
            <option value="UNPAID">UNPAID</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={leave.startDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={leave.endDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

     
        <div>
          <label className="block font-semibold mb-1">Days Requested</label>
          <input
            type="number"
            value={leave.daysRequested}
            readOnly
            className="w-full border rounded-lg p-2 bg-gray-100"
          />
        </div>

       
        <div>
          <label className="block font-semibold mb-1">Reason</label>
          <textarea
            name="reason"
            value={leave.reason}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

       
        <div>
          <label className="block font-semibold mb-1">Status</label>
          <select
            name="leaveStatus"
            value={leave.leaveStatus}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Submit Leave
        </button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
