import { useEffect, useState } from "react";
import api from "../api/api";

const LeaveApproval = () => {
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState("");

  const fetchLeaves = async () => {
    try {
      const response = await api.get("/leaves"); 
      setLeaves(response.data);
    } catch (error) {
      console.error("Error fetching leaves");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const approveLeave = async (id) => {
    try {
      await api.put(`/api/leaves/${id}/approve`);
      setMessage("Leave Approved ");
      fetchLeaves();
    } catch (error) {
      setMessage("Error approving leave ");
    }
  };

  const rejectLeave = async (id) => {
    try {
      await api.put(`/api/leaves/${id}/reject`);
      setMessage("Leave Rejected ");
      fetchLeaves();
    } catch (error) {
      setMessage("Error rejecting leave ");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Leave Approval Panel
      </h2>

      {message && (
        <div className="mb-4 text-center text-sm text-green-600">
          {message}
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Employee</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Start</th>
            <th className="p-2 border">End</th>
            <th className="p-2 border">Days</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id} className="text-center">
              <td className="border p-2">{leave.employeeName}</td>
              <td className="border p-2">{leave.leaveType}</td>
              <td className="border p-2">{leave.startDate}</td>
              <td className="border p-2">{leave.endDate}</td>
              <td className="border p-2">{leave.daysRequested}</td>
              <td className="border p-2">{leave.leaveStatus}</td>
              <td className="border p-2 space-x-2">
                {leave.leaveStatus === "PENDING" && (
                  <>
                    <button
                      onClick={() => approveLeave(leave.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectLeave(leave.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveApproval;
