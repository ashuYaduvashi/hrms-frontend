import { useEffect, useState } from "react";
import api from "../api/api";
import styles from "./AssignProject.module.css";

const AssignProject=()=>{
   const initialFormData={
    employeeId:"",
    projectId:"",
    moduleId:"",
    projectStatus:"",
    assignDate:""
   }
   const [formData, setFormData] = useState(initialFormData);
   const [employee, setEmployee] = useState([]);
   const [project, setProject] = useState([]);
   const [modules, setModules] = useState([]);
   const [message, setMessage] = useState("");
   const [error, setErrors] = useState("");


   const handleChange=(e)=>{
      setFormData({
        ...formData , 
      [e.target.name] : e.target.value
      })
   }

   useEffect(() => {
  const fetchEmployee = async () => {
    try {
      const empRes = await api.get("/employee/all");
      setEmployee(empRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProject = async () => {
    try {
      const proRes = await api.get("/projects");
      setProject(proRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchEmployee();
  fetchProject();
}, []);

useEffect(() => {
  const fetchModules = async () => {
    if (!formData.projectId) return; 

    try {
      const mpdRes = await api.get(
        `/projects/${formData.projectId}/modules`
      );
      setModules(mpdRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchModules();
}, [formData.projectId]);

   const handleSubmit = async (e) =>{
     e.preventDefault();
      try{
         const res = await api.post("/assignProjectToEmp" ,formData);
         setMessage("Data Submited sucessfully");
         setErrors("")
         setFormData(initialFormData);
      }
      catch(err){
         console.log(err);
         setErrors("Something went wrong!!");
         setMessage("");
      }
   }

   return(
      <div className={styles.formContainer}>
            <h2 className={styles.heading}>Project Assign</h2>
      
            {message && <p className={styles.success}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}
      
            <form onSubmit={handleSubmit} className={styles.form}>
      
              <div className={styles.formGroup}>
                <label>Employee *</label>
                <select
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Employee</option>
                  {employee.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>


                <div className={styles.formGroup}>
                <label>Project *</label>
                <select
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Project</option>
                  {project.map((pro) => (
                    <option key={pro.projectId} value={pro.projectId}>
                      {pro.projectName}
                    </option>
                  ))}
                </select>
              </div>

                <div className={styles.formGroup}>
                <label>Module *</label>
                <select
                  name="moduleId"
                  value={formData.moduleId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Module</option>
                  {modules.map((mod) => (
                    <option key={mod.id} value={mod.id}>
                      {mod.name}
                    </option>
                  ))}
                </select>
              </div>
      
              <div className={styles.formGroup}>
                <label>Project Status *</label>
                <select
                  name="projectStatus"
                  value={formData.projectStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="ACTIVE">Active</option>
                  <option value="ONHOLD">On Hold</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
      
              <div className={styles.formGroup}>
                <label>Assign Date</label>
               <input type="date" name="assignDate" value={formData.assignDate} onChange={handleChange}/>
              </div>
      
              <button type="submit" className={styles.button}>
                Assign Project
              </button>
      
            </form>
          </div>
   )

}

 export default AssignProject;