import { useEffect, useState } from "react";
import api from "../api/api";

const ModuleForm = () => {
  const [module, setModule] = useState({
    name: "",
    description: "",
    projectId: "",
    employeeId: "",
  });

  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch projects and employees on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, employeesRes] = await Promise.all([
          api.get("/projects"),           // Get all projects
          api.get("/admin/employees")      // Get all employees
        ]);
        
        // Filter only ACTIVE projects
        const activeProjects = projectsRes.data.filter(
          (p) => p.status === "ACTIVE"
        );
        setProjects(activeProjects);
        
        // Filter only ACTIVE employees
        const activeEmployees = employeesRes.data.filter(
          (e) => e.status === "ACTIVE"
        );
        setEmployees(activeEmployees);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load projects or employees");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setModule({
      ...module,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const moduleData = {
        name: module.name,
        description: module.description,
        projectId: parseInt(module.projectId),
        employeeId: parseInt(module.employeeId)
      };

      // ✅ Matches your backend endpoint: /projects/modules
      const response = await api.post("/projects/modules", moduleData);
      
      console.log("Module created:", response.data);
      alert("✅ Module Created Successfully!");
      
      // Reset form
      setModule({
        name: "",
        description: "",
        projectId: "",
        employeeId: "",
      });
    } catch (error) {
      console.error("Error creating module:", error);
      
      if (error.response?.status === 403) {
        alert("❌ Access Denied: You don't have permission to create modules");
      } else if (error.response?.status === 404) {
        alert("❌ Project or Employee not found");
      } else if (error.response?.data?.message) {
        alert(`❌ Error: ${error.response.data.message}`);
      } else {
        alert("❌ Error creating module. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mt-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mt-8">
      <div className="flex items-center mb-6">
        <div className="bg-green-100 p-3 rounded-lg mr-4">
          <svg 
            className="w-6 h-6 text-green-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-green-600">
          Create New Module
        </h2>
      </div>
      
      {/* Warning if no projects */}
      {projects.length === 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="shrink-0">
              <svg 
                className="h-5 w-5 text-yellow-400" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                ⚠️ No active projects available. Please create a project first before adding modules.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Module Name */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Module Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g., User Authentication, Payment Gateway, Dashboard"
            value={module.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            placeholder="Describe the module's purpose, features, and functionality..."
            value={module.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Provide a clear description to help team members understand this module
          </p>
        </div>

        {/* Project Dropdown */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Select Project <span className="text-red-500">*</span>
          </label>
          <select
            name="projectId"
            value={module.projectId}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
            disabled={projects.length === 0}
          >
            <option value="">-- Choose a project --</option>
            {projects.map((project) => (
              <option key={project.projectId} value={project.projectId}>
                {project.projectName} 
                {project.startDate && ` (Started: ${project.startDate})`}
              </option>
            ))}
          </select>
          {projects.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {projects.length} active project{projects.length !== 1 ? 's' : ''} available
            </p>
          )}
        </div>

        {/* Employee Dropdown */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Assign Module Owner <span className="text-red-500">*</span>
          </label>
          <select
            name="employeeId"
            value={module.employeeId}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="">-- Select an employee --</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
                {emp.designation?.title && ` - ${emp.designation.title}`}
                {emp.email && ` (${emp.email})`}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            The employee responsible for this module
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting || projects.length === 0}
            className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition duration-200 transform ${
              submitting || projects.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                <svg 
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
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
                Creating Module...
              </span>
            ) : (
              "Create Module"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModuleForm;