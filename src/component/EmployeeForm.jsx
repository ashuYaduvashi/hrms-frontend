import { useEffect, useState } from "react";
import styles from "./EmployeeForm.module.css";
import EmployeeService from "../service/EmployeeService";

 

  const emptyAddress = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  district: "",
  state: "",
  country: "",
  pincode: ""
};

const EmployeeForm= () => {

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    education: "",
    hireDate: "",
    sameAsCurrent: false,
    currentAddress: { ...emptyAddress },
    permanentAddress: { ...emptyAddress }
  });

  // ================= FETCH PROFILE =================
  useEffect(() => {
    EmployeeService.getMyProfile()
      .then(res => {
        const data = res.data;

        setEmployee(prev => ({
          ...prev,
          name: data.name || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          education: data.education || "",
          hireDate: data.hireDate
            ? new Date(data.hireDate).toISOString().split("T")[0]
            : "",
          dob: data.dob
            ? new Date(data.dob).toISOString().split("T")[0]
            : "",
          currentAddress: data.currentAddress || emptyAddress,
          permanentAddress: data.permanentAddress || emptyAddress
        }));
      })
      .catch(err => console.log(err));
  }, []);

  // ================= BASIC FIELD CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ================= ADDRESS CHANGE =================
  const handleAddressChange = (e, type) => {
    const { name, value } = e.target;

    setEmployee(prev => {
      const updated = {
        ...prev,
        [type]: {
          ...prev[type],
          [name]: value
        }
      };

      // 🔥 Auto sync permanent when sameAsCurrent is true
      if (type === "currentAddress" && prev.sameAsCurrent) {
        updated.permanentAddress = {
          ...updated.currentAddress
        };
      }

      return updated;
    });
  };

  // ================= SAME AS TOGGLE =================
  const handleSameAsToggle = (e) => {
    const checked = e.target.checked;

    setEmployee(prev => ({
      ...prev,
      sameAsCurrent: checked,
      permanentAddress: checked
        ? { ...prev.currentAddress }
        : { ...emptyAddress }
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    EmployeeService.updateMyProfile(employee)
      .then(() => alert("Profile Updated Successfully"))
      .catch(err => console.log(err));
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.profileCard}>
        <h2 className={styles.title}>Employee Profile</h2>

        <form onSubmit={handleSubmit}>

          {/* ================= BASIC INFO ================= */}
          <div className={styles.section}>
            <h3>Basic Information</h3>

            <div className={styles.grid}>
              <Input label="Name" name="name" value={employee.name} onChange={handleChange} />
              <Input label="Email" name="email" value={employee.email} onChange={handleChange} />
              <Input label="Phone Number" name="phoneNumber" value={employee.phoneNumber} onChange={handleChange} />
              <Input type="date" label="Date of Birth" name="dob" value={employee.dob} onChange={handleChange} />
              <Input label="Education" name="education" value={employee.education} onChange={handleChange} />
              <Input type="date" label="Hire Date" name="hireDate" value={employee.hireDate} onChange={handleChange} />
            </div>
          </div>

          {/* ================= CURRENT ADDRESS ================= */}
          <div className={styles.section}>
            <h3>Current Address</h3>

            <div className={styles.grid}>
              {Object.keys(employee.currentAddress).map(field => (
                <Input
                  key={field}
                  label={field}
                  name={field}
                  value={employee.currentAddress[field]}
                  onChange={(e) => handleAddressChange(e, "currentAddress")}
                />
              ))}
            </div>
          </div>

          {/* ================= CHECKBOX ================= */}
          <div className={styles.checkboxWrapper}>
            <label>
              <input
                type="checkbox"
                checked={employee.sameAsCurrent}
                onChange={handleSameAsToggle}
              />
              Same as Current Address
            </label>
          </div>

          {/* ================= PERMANENT ADDRESS ================= */}
          <div className={styles.section}>
            <h3>Permanent Address</h3>

            <div className={styles.grid}>
              {Object.keys(employee.permanentAddress).map(field => (
                <Input
                  key={field}
                  label={field}
                  name={field}
                  value={employee.permanentAddress[field]}
                  onChange={(e) => handleAddressChange(e, "permanentAddress")}
                  disabled={employee.sameAsCurrent}
                />
              ))}
            </div>
          </div>

          {/* ================= BUTTON ================= */}
          <div className={styles.buttonWrapper}>
            <button className={styles.saveBtn}>
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

// ================= REUSABLE INPUT =================
const Input = ({ label, type = "text", disabled = false, ...props }) => (
  <div className={styles.inputGroup}>
    <label>{label}</label>
    <input type={type} disabled={disabled} {...props} />
  </div>
);


export default EmployeeForm;
