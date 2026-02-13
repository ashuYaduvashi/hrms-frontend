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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await api.post("/auth/login", form);

  //     const token = response.data.token;

  //     localStorage.setItem("token", token);

  //     navigate("/dashboard");
  //   } catch (error) {
  //     alert("Invalid email or password");
  //   }
  // };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", form);

    const token = response.data.token;

    localStorage.setItem("token", token);

   
    const decoded = jwtDecode(token);

    
    localStorage.setItem("role", decoded.role);

    navigate("/dashboard");

  } catch (error) {
    alert("Invalid email or password");
  }
};


  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

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
    margin: "10px 0",
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
