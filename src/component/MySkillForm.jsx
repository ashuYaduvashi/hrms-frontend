import { useState } from "react";
import api from "../api/api";

const MySkillForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    technologyType: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/technologies", formData);

      setMessage("Skill added successfully ✅");
      setError("");

      setFormData({
        name: "",
        technologyType: ""
      });

    } catch (err) {
      setError("Failed to add skill ❌");
      setMessage("");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Skill</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>

        <div>
          <label>Technology Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter technology (e.g., React)"
          />
        </div>

        <div>
          <label>Technology Type *</label>
          <select
            name="technologyType"
            value={formData.technologyType}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Type --</option>
            <option value="FRONTEND">Frontend</option>
            <option value="BACKEND">Backend</option>
            <option value="DATABASE">Database</option>
            <option value="DEVOPS">DevOps</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <button type="submit">Add Skill</button>

      </form>
    </div>
  );
};

export default MySkillForm;


