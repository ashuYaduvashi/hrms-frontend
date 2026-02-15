import { useState } from "react";
import api from "../api/api";

const EmployeeSearch = () => {
  const [id, setId] = useState("");
  const [employee, setEmployee] = useState(null);

  const search = async () => {
    const res = await api.get(`/employee/${id}`);
    setEmployee(res.data);
  };

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Search Employee</h2>

      <div className="flex gap-3 mb-4">
        <input
          type="number"
          placeholder="Employee ID"
          className="border p-2 rounded"
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={search} className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {employee && (
        <div className="bg-white shadow rounded p-4">
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeSearch;
