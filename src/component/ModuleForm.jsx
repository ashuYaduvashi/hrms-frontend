import React, { useEffect, useState } from "react";
import axios from "axios";

const ModuleForm = () => {

  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [modules, setModules] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: "",
    projectId: "",
    moduleId: "",
    assignedDate: "",
    hoursWorked: "",
    projectStatus: "ACTIVE"
  });

 
  useEffect(() => {
    fetchEmployees();
    fetchProjects();
    fetchModules();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:8080/api/employees");
    setEmployees(res.data);
  };

  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:8080/api/projects");
    setProjects(res.data);
  };

  const fetchModules = async () => {
    const res = await axios.get("http://localhost:8080/api/modules");
    setModules(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      employee: { id: formData.employeeId },
      project: { projectId: formData.projectId },
      modules: { id: formData.moduleId },
      assignedDate: formData.assignedDate,
      hoursWorked: formData.hoursWorked,
      projectStatus: formData.projectStatus
    };

    try {
      await axios.post("http://localhost:8080/api/assignments", payload);
      alert("Assignment Created Successfully ");
    } catch (error) {
      console.error(error);
      alert("Error creating assignment ");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Assign Employee to Project</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

       
        <select
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.firstName} {emp.lastName}
            </option>
          ))}
        </select>

        <select
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Project</option>
          {projects.map(pro => (
            <option key={pro.projectId} value={pro.projectId}>
              {pro.projectName}
            </option>
          ))}
        </select>

      
        <select
          name="moduleId"
          value={formData.moduleId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Module</option>
          {modules.map(mod => (
            <option key={mod.id} value={mod.id}>
              {mod.name}
            </option>
          ))}
        </select>

     
        <input
          type="date"
          name="assignedDate"
          value={formData.assignedDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

      
        <input
          type="number"
          name="hoursWorked"
          placeholder="Hours Worked"
          value={formData.hoursWorked}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

       
        <select
          name="projectStatus"
          value={formData.projectStatus}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="ON_HOLD">ON_HOLD</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Assign
        </button>

      </form>
    </div>
  );
};

export default ModuleForm;
