// import { Route, Routes } from "react-router-dom";
// import MainLayout from "../layout/MainLayout";
// import Home from "../component/Home";
// import Login from "../component/Login";
// import Dashboard from "../component/Dashboard";
// import ProtectedRoute from "../route/ProtectedRoute";
// import EmployeeForm from "../component/EmployeeForm";
// import Register from "../component/Register";

// const UserManage = () => <h2>Manage User</h2>;
// const ManageEmployee = () => <h2>Manage Employee</h2>;
// const ManageRole = () => <h2>Manage Role</h2>;
// const UsersHome = () => <h2>User Management Home</h2>;

// const AppRoutes = () => {
//   return (
//     <Routes>

     
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

      
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <MainLayout />
//           </ProtectedRoute>
//         }
//       >

//         <Route index element={<Dashboard />} />

//         <Route path="profile" element={<EmployeeForm />} />

       
//         <Route path="users">
//           <Route index element={<UsersHome />} />
//           <Route path="usermanage" element={<UserManage />} />
//           <Route path="manageEmployee" element={<ManageEmployee />} />
//           <Route path="manageRole" element={<ManageRole />} />
//         </Route>

//       </Route>

//     </Routes>
//   );
// };

// export default AppRoutes;



import { Route, Routes } from "react-router-dom";
import Dashboard from "../component/Dashboard";
import EmployeeForm from "../component/EmployeeForm";
import EmployeeList from "../component/EmployeeList";
// import EmployeeSearch from "../component/EmployeeSearch";
import Home from "../component/Home";
import LeaveApply from "../component/LeaveApply";
import LeaveApproval from "../component/LeaveApproval";
import Login from "../component/Login";
import ModuleForm from "../component/ModuleForm";
import MyProjectDetails from "../component/MyProjectDetails";
import Profile from "../component/Profile";
import ProjectForm from "../component/ProjectForm";
import ProjectList from "../component/ProjectList";
import Register from "../component/Register";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "../route/ProtectedRoute";
import AddTechnologyAdmin from "../component/AddTechnologyAdmin";
import MyskillForm from "../component/MySkillForm"
// const EmployeeList = () => <h2>Employee List</h2>;
// const EmployeeSearch = () => <h2>Search Employee</h2>;


// const ProjectList = () => <h2>Project List</h2>;
// const ProjectForm = () => <h2>Create Project</h2>;
// const ModuleDetails = () => <h2>Module Details</h2>;

// const LeaveApply = () => <h2>Apply Leave</h2>;
// const LeaveApproval = () => <h2>Leave Approval</h2>;


const DepartmentList = () => <h2>Department List</h2>;

const AppRoutes = () => {
  return (
    <Routes>

   
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

     
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        
        <Route path="profile" 
        element={
          <ProtectedRoute allowedRoles={["ROLE_EMPLOYEE"]}>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="upProfile"
         element={
        <ProtectedRoute allowedRoles={["ROLE_EMPLOYEE"]}>
           <EmployeeForm />
        </ProtectedRoute>
         }/>
       
        <Route
          path="employees"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <EmployeeList />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="employees/search"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <EmployeeSearch />
            </ProtectedRoute>
          }
        /> */}

       
        <Route
          path="projects"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <ProjectList />
            </ProtectedRoute>
          }
        />

        <Route
          path="projects/create"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <ProjectForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="projects/modules"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <ModuleForm />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="leave/apply"
          element={
            <ProtectedRoute allowedRoles={["ROLE_EMPLOYEE"]}>
              <LeaveApply />
            </ProtectedRoute>
          }
        />

        <Route
          path="myProject"
          element={
            <ProtectedRoute allowedRoles={["ROLE_EMPLOYEE"]}>
              <MyProjectDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="leave/approval"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <LeaveApproval />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="addTechnologyAdmin"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AddTechnologyAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="mySkills"
          element={
            <ProtectedRoute>
              <MyskillForm/>
            </ProtectedRoute>
          }
        />

      </Route>

    </Routes>
  );
};

export default AppRoutes;

