import { useEffect, useState } from "react";
import api from "../api/api";
import styles from "./MyskillForm.module.css";

const MySkillForm = () => {

  const [formData, setFormData] = useState({
    technologyId: "",
    experienceInMonths: "",
    proficiency: "",
    usageDescription: ""
  });

  const [technologies, setTechnologies] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const res = await api.get("/technologies");
        setTechnologies(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTechnologies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/employee/empTechnology", formData);

      setMessage("Skill added successfully");
      setError("");

      setFormData({
        technologyId: "",
        experienceInMonths: "",
        proficiency: "",
        usageDescription: ""
      });

    } catch (err) {
      setError("Failed to add skill");
      setMessage("");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Add Skill</h2>

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>

        <div className={styles.formGroup}>
          <label>Technology *</label>
          <select
            name="technologyId"
            value={formData.technologyId}
            onChange={handleChange}
            required
          >
            <option value="">Select Technology</option>
            {technologies.map((tech) => (
              <option key={tech.id} value={tech.id}>
                {tech.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Experience (Months) *</label>
          <input
            type="number"
            name="experienceInMonths"
            value={formData.experienceInMonths}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Proficiency *</label>
          <select
            name="proficiency"
            value={formData.proficiency}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
            <option value="EXPERT">Expert</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Usage Description</label>
          <textarea
            name="usageDescription"
            value={formData.usageDescription}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.button}>
          Add Skill
        </button>

      </form>
    </div>
  );
};

export default MySkillForm;
