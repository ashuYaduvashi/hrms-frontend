import api from "../api/api"; // your axios instance

const EmployeeService = {
  // Admin update any employee
  updateEmployeeByAdmin: (id, data) => {
    return api.put(`/admin/employees/${id}`, data);
  },

  // Employee update own profile (ID not needed because backend takes from token)
  updateMyProfile: (data) => {
    return api.put(`/employee/upProfile`, data);
  },

  // Get employee by id (admin)
  getEmployeeById: (id) => {
    return api.get(`/admin/employees/${id}`);
  },

  // Get logged in employee profile
  getMyProfile: () => {
    return api.get(`/employee/profile`);
  },

  getDesignations: () => api.get(`/designations`)

};

export default EmployeeService;
