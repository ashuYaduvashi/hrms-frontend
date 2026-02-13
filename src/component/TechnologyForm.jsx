import React, { useState } from "react";
import axios from "axios";

const TechnologyForm = () => {

  
  const API_URL = "http://localhost:8080/technologie";

  const [technology, setTechnology] = useState({
    name: "",
    technologyType: "FRONTEND"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTechnology({
      ...technology,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, technology);
      alert("Technology Created Successfully ");
      console.log(response.data);

     
      setTechnology({
        name: "",
        technologyType: "FRONTEND"
      });

    } catch (error) {
      console.error(error);
      alert("Error creating technology ");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-2xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
        Add Technology
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

     
        <div>
          <label className="block font-semibold mb-1">Technology Name</label>
          <input
            type="text"
            name="name"
            value={technology.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            placeholder="Enter technology name"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Technology Type</label>
          <select
            name="technologyType"
            value={technology.technologyType}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="FRONTEND">FRONTEND</option>
            <option value="BACKEND">BACKEND</option>
            <option value="DATABASE">DATABASE</option>
            <option value="DEVOPS">DEVOPS</option>
            <option value="MOBILE">MOBILE</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Save Technology
        </button>

      </form>
    </div>
  );
};

export default TechnologyForm;
