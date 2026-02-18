import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api/api";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    // clear field error while typing
    setError(prev => ({
      ...prev,
      [e.target.name]: ""
    }));
  };

  const validate = (values) => {
    const newError = {};
    const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!values.email) {
      newError.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      newError.email = "Invalid email format";
    }

    if (!values.password) {
      newError.password = "Password is required";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const isValid = validate(form);
    if (!isValid) return;

   try {
  const response = await api.post("/auth/login", form);

  const token = response.data?.token;

  if (!token) {
    throw new Error("Token not received");
  }


  localStorage.setItem("token", token);

 
  const decoded = jwtDecode(token);

  if (!decoded?.role) {
    console.warn("Role not found in token");
  }

  navigate("/dashboard");

} catch (err) {
  console.error("Login error:", err);
  setError({ general: "Invalid email or password" });
}

  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2>Login</h2>

        {error.general && (
          <p style={{ color: "red" }}>{error.general}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />
        {error.email && (
          <p style={{ color: "red" }}>{error.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />
        {error.password && (
          <p style={{ color: "red" }}>{error.password}</p>
        )}

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
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
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default Login;
