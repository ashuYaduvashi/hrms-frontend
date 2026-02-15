import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search, employees]);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/api/employees");
      setEmployees(res.data);
      setFilteredEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!search) {
      setFilteredEmployees(employees);
      return;
    }

    const lowerSearch = search.toLowerCase();

    const filtered = employees.filter((emp) =>
      emp.name?.toLowerCase().includes(lowerSearch) ||
      emp.email?.toLowerCase().includes(lowerSearch) ||
      emp.phone?.toLowerCase().includes(lowerSearch)
    );

    setFilteredEmployees(filtered);
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading employees...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-xl rounded-2xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Employee List
          </h1>

          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
                <th className="p-4">Employee</th>
                <th className="p-4">Department</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Employee Info */}
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={
                        emp.profileImage ||
                        "https://i.pravatar.cc/40"
                      }
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {emp.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {emp.designation}
                      </p>
                    </div>
                  </td>

                  <td className="p-4 text-gray-700">
                    {emp.department?.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {emp.email}
                  </td>

                  <td className="p-4 text-gray-600">
                    {emp.phone}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        emp.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        navigate(`/employees/${emp.id}`)
                      }
                      className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No employees found.
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
