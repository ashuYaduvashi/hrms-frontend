import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Welcome to HRMS</h1>
        <p style={{ marginTop: "10px", color: "#555" }}>
          Human Resource & Project Management System
        </p>

        <div style={{ marginTop: "30px" }}>
          <p>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>

          <p style={{ marginTop: "10px" }}>
            First time here?{" "}
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  link: {
    color: "#12498A",
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
  },
};

export default Home;
