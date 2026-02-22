import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import "./Dashboard.css";


const Dashboard = () => {
const token = localStorage.getItem("token");

let decoded = null;

if (token) {
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token");
  }
}

console.log("decoded user data:", decoded);

const name =
  decoded?.name ||
  decoded?.employeeName ||
  User;

const role = decoded?.role || "Employee";

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="dashboard-container">
      <div className={`dashboard-card ${animate ? "show" : ""}`}>
        <div className="text-section">
          <h1 className="welcome-text">
            Hello, <span>{name}</span> 👋
          </h1>

          <p className="role-text">
            Logged in as <strong>{role.replace("ROLE_", "")}</strong>
          </p>

          <p className="sub-text">
            Welcome to your HRMS Dashboard. Manage your work efficiently.
          </p>
        </div>

        <div className="image-section">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="dashboard"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
