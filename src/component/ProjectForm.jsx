import { useState } from "react";
import axios from "axios";

const ProjectForm = () => {
  const [project, setProject] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/projects", project);
      alert("Project Created Successfully");
      setProject({
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error creating project");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Create Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={project.projectName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={project.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          name="startDate"
          value={project.startDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          name="endDate"
          value={project.endDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="status"
          value={project.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Status</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="ON_HOLD">On Hold</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
