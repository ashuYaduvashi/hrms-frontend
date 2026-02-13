import React, { useState } from "react";
import axios from "axios";

const ProjectForm = () => {

 
  const API_URL = "http://localhost:8080/project";

  const [project, setProject] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "ACTIVE"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, project);
      alert("Project Created Successfully ");
      console.log(response.data);

     
      setProject({
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "ACTIVE"
      });

    } catch (error) {
      console.error(error);
      alert("Error creating project ❌");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-2xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
        Create Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block font-semibold mb-1">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={project.projectName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

      
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>


        <div>
          <label className="block font-semibold mb-1">Status</label>
          <select
            name="status"
            value={project.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="ON_HOLD">ON_HOLD</option>
          </select>
        </div>

       
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Save Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
