import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./Dashboard.css";


const formatNameFromEmail = (email) => {
  if (!email) return "User";

 
  const raw = email.split("@")[0];

  const noDigits = raw.replace(/[0-9]/g, "");

 
  const withSpaces = noDigits.replace(/[_\-.]/g, " ");


  const formatted = withSpaces
    .split(" ")
    .filter(word => word.trim() !== "")
    .map(word =>
      word.charAt(0).toUpperCase() +
      word.slice(1).toLowerCase()
    )
    .join(" ");

  return formatted || "User";
};


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
  decoded?.username ||
  formatNameFromEmail(decoded?.sub);

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
