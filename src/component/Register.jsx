import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

   
    setErrors(prev => ({
      ...prev,
      [e.target.name]: ""
    }));

    setGeneralError("");
  };

  const validate = (values) => {
    const newErrors = {};

    const nameRegex = /^[A-Za-z .-]+$/;
    const emailRegex = /^[A-Za-z+_.-][A-Za-z0-9+_.-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!values.name) {
      newErrors.name = "Name is required";
    } else if (!nameRegex.test(values.name)) {
      newErrors.name = "Only characters allowed";
    }

    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      newErrors.password =
        "Password must contain minimum 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const isValid = validate(form);
    if (!isValid) return;

   try {
  await api.post("/auth/register", form);

  setSuccessMessage("Registration successful! Redirecting to login...");
  setGeneralError("");

  setTimeout(() => {
    navigate("/login");
  }, 2000);

} catch (error) {
  setGeneralError(
    error.response?.data?.message || "Registration failed"
  );
}

  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h2>Register</h2>
        {successMessage && (
           <p style={{ color: "green" }}>{successMessage}</p>
          )}
        {generalError && (
          <p style={{ color: "red" }}>{generalError}</p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.name && (
          <p style={{ color: "red" }}>{errors.name}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.email && (
          <p style={{ color: "red" }}>{errors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password}</p>
        )}

       <button type="submit" style={styles.button} disabled={successMessage}>
          Register
       </button>


        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f6f9"
  },
  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "320px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default Register;
