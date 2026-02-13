import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeProfile = ({ employeeId }) => {

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/
         employees/${employeeId}/profile`
      );
      setProfile(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded space-y-6">

      <div>
        <h2 className="text-2xl font-bold mb-2">
          {profile.firstName} {profile.lastName}
        </h2>
        <p>Email: {profile.email}</p>
        <p>Designation: {profile.designationTitle}</p>
        <p>Salary: ₹{profile.baseSalary}</p>
      </div>

    
      <div>
        <h3 className="text-xl font-semibold mb-2">Technologies</h3>
        <ul className="list-disc ml-5">
          {profile.technologies.map((tech, index) => (
            <li key={index}>
              {tech.name} - {tech.experienceInMonths} months - {tech.proficiency}
            </li>
          ))}
        </ul>
      </div>

     
      <div>
        <h3 className="text-xl font-semibold mb-2">Projects</h3>
        <ul className="list-disc ml-5">
          {profile.projects.map((proj, index) => (
            <li key={index}>
              {proj.projectName} ({proj.status})
            </li>
          ))}
        </ul>
      </div>

 
      <div>
        <h3 className="text-xl font-semibold mb-2">Modules</h3>
        <ul className="list-disc ml-5">
          {profile.modules.map((mod, index) => (
            <li key={index}>
              {mod.name} - {mod.description}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Leave Requests</h3>
        <ul className="list-disc ml-5">
          {profile.leaves.map((leave, index) => (
            <li key={index}>
              {leave.startDate} to {leave.endDate} - {leave.status}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default EmployeeProfile;
