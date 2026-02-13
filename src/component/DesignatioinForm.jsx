import React, { useState } from "react";
import axios from "axios";

const DesignationForm = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    baseSalary: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/designations", formData);
      alert("Designation Created Successfully ");

   
      setFormData({
        title: "",
        description: "",
        baseSalary: ""
      });

    } catch (error) {
      console.error(error);
      alert("Error creating designation ❌");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Designation</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Designation Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

    
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

       
        <input
          type="number"
          name="baseSalary"
          placeholder="Base Salary"
          value={formData.baseSalary}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Save Designation
        </button>

      </form>
    </div>
  );
};

export default DesignationForm;
