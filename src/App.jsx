
import './App.css'
import Dashboard from './component/Dashboard'
import Header from './component/Header';
import SideBar from './component/Sidebar';
import { Outlet } from "react-router-dom";

import {
  FaUserCog,
  FaUsers,
  FaFileAlt,
  FaCommentDots,
  FaComments,
  FaBuilding,
  FaBook,
  FaLink,
  FaPhotoVideo,
  FaClipboardCheck,
  FaSignOutAlt,
} from "react-icons/fa";

export const DivContent = [
  { id: 1, title: "Manage Profile", icon: <FaUserCog /> },
  { id: 2, title: "User Management", icon: <FaUsers /> },
  { id: 3, title: "CMS Page", icon: <FaFileAlt /> },
  { id: 4, title: "Manage Feedback", icon: <FaCommentDots /> },
  { id: 5, title: "Manage Discussion Forum", icon: <FaComments /> },
  { id: 6, title: "Manage Organization Setup", icon: <FaBuilding /> },
  { id: 7, title: "Manage Glossary Forum", icon: <FaBook /> },
  { id: 8, title: "Manage Important Link Logo", icon: <FaLink /> },
  { id: 9, title: "Manage Media Center", icon: <FaPhotoVideo /> },
  { id: 10, title: "Manage Audit", icon: <FaClipboardCheck /> },
  { id: 11, title: "Logout", icon: <FaSignOutAlt /> },
];

const SIDEBAR_LINKS = [
  {
    id: 1,
    label: "Dashboard",
    path: "/dashboard",
    roles: ["SUPER ADMIN","ADMIN", "USER"],
    children: []
  },
  {
    id: 2,
    label: "View Profile",
    path: "/profile",
    roles: ["SUPER ADMIN","ADMIN", "USER"],
    children: []
  },
  {
    id: 3,
    label: "User Management",
    path: "/users",
    roles: ["SUPER ADMIN","ADMIN"],
    children: [
      {
        id: 31,
        label: "Manage User",
        path: "/users/usermanage",
        roles: ["SUPER ADMIN","ADMIN"]
      },
      {
        id: 32,
        label: "Manage Employee",
        path: "/users/manageEmployee",
        roles: ["SUPER ADMIN","ADMIN"]
      },
      {
        id: 33,
        label: "Manage Role",
        path: "/users/manageRole",
        roles: ["SUPER ADMIN"]
      }
    ]
  }]


function App() {
 

  return (
    <div className="app">
       <Header
        source="https://i.pinimg.com/564x/d2/c1/6d/d2c16d99034f9407fd708dfc3356c688.jpg"
        title="Human Resouse And Project Management"
        date="29 Dec 2025"
        time="12:18 PM"
        options={["Super Admin", "Admin", "User"]}
      />
     {/* <Dashboard divContent={DivContent}/> */}
           <div className="bodyLayout">
        <SideBar Linkvalue={SIDEBAR_LINKS} />
        <main className="content">
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default App
