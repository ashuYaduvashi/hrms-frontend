import React, { useState } from "react";
import axios from "axios";
import Input from "./reusable/Input"
const EmployeeForm = () => {

 
  const API_URL = "http://localhost:8080/employee";

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    education: "",
    designation: {
      id: "",
    },
    hireDate: "",
    sameAsPermanent: false,
    status: "ACTIVE",
    role: "EMPLOYEE",
    currentAddress: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
    },
    permanentAddress: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("currentAddress")) {
      const field = name.split(".")[1];
      setEmployee({
        ...employee,
        currentAddress: {
          ...employee.currentAddress,
          [field]: value,
        },
      });
    } 
    else if (name.includes("permanentAddress")) {
      const field = name.split(".")[1];
      setEmployee({
        ...employee,
        permanentAddress: {
          ...employee.permanentAddress,
          [field]: value,
        },
      });
    } 
    else if (name === "sameAsPermanent") {
      setEmployee({
        ...employee,
        sameAsPermanent: checked,
        permanentAddress: checked
          ? employee.currentAddress
          : employee.permanentAddress,
      });
    } 
    else if (name === "designationId") {
      setEmployee({
        ...employee,
        designation: { id: value },
      });
    } 
    else {
      setEmployee({
        ...employee,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, employee);
      alert("Employee Created Successfully ✅");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Error creating employee ❌");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Create Employee
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Name" name="name" value={employee.name} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={employee.email} onChange={handleChange} />
          <Input label="Password" name="password" type="password" value={employee.password} onChange={handleChange} />
          <Input label="Phone Number" name="phoneNumber" value={employee.phoneNumber} onChange={handleChange} />
          <Input label="Education" name="education" value={employee.education} onChange={handleChange} />
          <Input label="Hire Date" name="hireDate" type="date" value={employee.hireDate} onChange={handleChange} />
        </div>

       
        <div>
          <label className="block font-semibold mb-1">Designation ID</label>
          <input
            type="number"
            name="designationId"
            value={employee.designation.id}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

     
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Role"
            name="role"
            value={employee.role}
            onChange={handleChange}
            options={["ADMIN", "EMPLOYEE", "MANAGER"]}
          />

          <Select
            label="Status"
            name="status"
            value={employee.status}
            onChange={handleChange}
            options={["ACTIVE", "INACTIVE"]}
          />
        </div>

        <AddressSection
          title="Current Address"
          type="currentAddress"
          address={employee.currentAddress}
          onChange={handleChange}
        />

      
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="sameAsPermanent"
            checked={employee.sameAsPermanent}
            onChange={handleChange}
          />
          <label>Permanent Address same as Current</label>
        </div>

        {!employee.sameAsPermanent && (
          <AddressSection
            title="Permanent Address"
            type="permanentAddress"
            address={employee.permanentAddress}
            onChange={handleChange}
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Save Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;






const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block font-semibold mb-1">{label}</label>
    <select
      {...props}
      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const AddressSection = ({ title, type, address, onChange }) => (
  <div className="border p-4 rounded-xl bg-gray-50">
    <h3 className="font-bold mb-3 text-blue-600">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.keys(address).map((field) => (
        <Input
          key={field}
          label={field}
          name={`${type}.${field}`}
          value={address[field]}
          onChange={onChange}
        />
      ))}
    </div>
  </div>
);


