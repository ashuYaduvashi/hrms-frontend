import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const name =
    user?.name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "User";

  const role = user?.role || "Employee";

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
