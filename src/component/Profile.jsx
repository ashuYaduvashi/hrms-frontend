import axios from "axios";
import { useEffect, useState } from "react";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/employee/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEmployee(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!employee) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">

      {/* ================= BASIC DETAILS ================= */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">Employee Profile</h2>

        <div className="grid grid-cols-2 gap-4">
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Phone:</strong> {employee.phoneNumber}</p>
          <p><strong>Education:</strong> {employee.education}</p>
          <p><strong>Hire Date:</strong> {employee.hireDate}</p>
          <p><strong>Status:</strong> {employee.status}</p>
          <p><strong>Designation:</strong> {employee.designation?.title}</p>
        </div>
      </div>

      {/* ================= ADDRESS ================= */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Address</h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Current Address</h4>
            <p>{employee.currentAddress?.addressLine1}</p>
            <p>{employee.currentAddress?.addressLine2}</p>
            <p>{employee.currentAddress?.city}</p>
            <p>{employee.currentAddress?.district}</p>
            <p>{employee.currentAddress?.state}</p>
            <p>{employee.currentAddress?.country}</p>
            <p>{employee.currentAddress?.pincode}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Permanent Address</h4>
            <p>{employee.permanentAddress?.addressLine1}</p>
            <p>{employee.permanentAddress?.addressLine2}</p>
            <p>{employee.permanentAddress?.city}</p>
            <p>{employee.permanentAddress?.district}</p>
            <p>{employee.permanentAddress?.state}</p>
            <p>{employee.permanentAddress?.country}</p>
            <p>{employee.permanentAddress?.pincode}</p>
          </div>
        </div>
      </div>

      {/* ================= TECHNOLOGIES ================= */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Technologies</h3>

        {employee.technologies?.length === 0 ? (
          <p>No Technologies Added</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {employee.technologies.map((tech) => (
              <div
                key={tech.id}
                className="border p-3 rounded-lg bg-gray-50"
              >
                <p><strong>{tech.technologyName}</strong></p>
                <p>Experience: {tech.experienceInMonths} months</p>
                <p>Proficiency: {tech.proficiency}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= PROJECTS & MODULES ================= */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Assigned Projects</h3>

        {employee.assignments?.length === 0 ? (
          <p>No Projects Assigned</p>
        ) : (
          employee.assignments.map((assignment) => (
            <div key={assignment.id} className="border p-4 rounded-lg mb-4">
              <h4 className="text-lg font-bold text-blue-600">
                {assignment.project?.projectName}
              </h4>

              <p className="text-gray-600">
                Module: {assignment.module?.moduleName}
              </p>

              <p>
                Duration: {assignment.startDate} -{" "}
                {assignment.endDate || "Ongoing"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* ================= LEAVE HISTORY ================= */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-4">Leave History</h3>

        {employee.leaveRequests?.length === 0 ? (
          <p>No Leave Taken</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">From</th>
                <th className="p-2 text-left">To</th>
                <th className="p-2 text-left">Reason</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {employee.leaveRequests.map((leave) => (
                <tr key={leave.id} className="border-b">
                  <td className="p-2">{leave.startDate}</td>
                  <td className="p-2">{leave.endDate}</td>
                  <td className="p-2">{leave.reason}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        leave.status === "APPROVED"
                          ? "bg-green-500"
                          : leave.status === "REJECTED"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;
