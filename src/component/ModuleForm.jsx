import axios from "axios";
import { useState } from "react";

const ModuleForm = () => {
  const [module, setModule] = useState({
    moduleName: "",
    description: "",
    projectId: "",
  });

  const handleChange = (e) => {
    setModule({
      ...module,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/modules", module);
      alert("Module Created Successfully");
      setModule({
        moduleName: "",
        description: "",
        projectId: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error creating module");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-green-600">
        Create Module
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="moduleName"
          placeholder="Module Name"
          value={module.moduleName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Module Description"
          value={module.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="projectId"
          placeholder="Project ID"
          value={module.projectId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Module
        </button>
      </form>
    </div>
  );
};

export default ModuleForm;
