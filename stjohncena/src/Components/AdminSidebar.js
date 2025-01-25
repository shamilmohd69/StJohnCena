import React from 'react';
import { useLocation } from 'react-router-dom';
import './utilities/AdminSidebar.css';

import logout from './utilities/logout.svg';
import home from './utilities/home.svg';
import student from './utilities/student.svg';
import department from './utilities/department.svg';
import teacher from './utilities/teacher.svg';
import chngpass from './utilities/chngpass.svg';
import cancel from './utilities/cancel.svg';
import menu from './utilities/menu.svg';
import complaint from './utilities/complaint.svg';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        <img src={isOpen ? cancel : menu} alt={isOpen ? 'Close' : 'Open'} />
      </button>
      <ul>
        <li className={isActive('/admin/home') ? 'active' : ''}>
          <a href="/admin/home" className="sidebar-link">
            <img src={home} alt="home" />
            {isOpen && <span style={{ marginLeft: '10px' }}>Home</span>}
          </a>
        </li>
        <li className={isActive('/admin/managestudents') ? 'active' : ''}>
          <a href="/admin/managestudents" className="sidebar-link">
            <img src={student} alt="student" />
            {isOpen && <span style={{ marginLeft: '10px' }}>Manage Students</span>}
          </a>
        </li>
        <li className={isActive('/admin/managestaff') ? 'active' : ''}>
          <a href="/admin/managestaff" className="sidebar-link">
            <img src={teacher} alt="teacher" />
            {isOpen && <span style={{ marginLeft: '10px' }}>Manage Staffs</span>}
          </a>
        </li>
        <li className={isActive('/admin/managedept') ? 'active' : ''}>
          <a href="/admin/managedept" className="sidebar-link">
            <img src={department} alt="department" />
            {isOpen && <span style={{ marginLeft: '10px' }}>Manage Departments</span>}
          </a>
        </li>
        <li className={isActive('/admin/complaints') ? 'active' : ''}>
          <a href="/admin/complaints" className="sidebar-link">
            <img src={complaint} alt="complaints" />
            {isOpen && <span style={{ marginLeft: '10px' }}>View Complaints</span>}
          </a>
        </li>
        <li className={isActive('/admin/changepass') ? 'active' : ''}>
          <a href="/admin/changepass" className="sidebar-link">
            <img src={chngpass} alt="change password" />
            {isOpen && <span style={{ marginLeft: '10px' }}>Change Password</span>}
          </a>
        </li>
        <li className={isActive('/logout') ? 'active' : ''}>
          <a href="/" className="sidebar-link">
            <img src={logout} alt="logout" />
            {isOpen && <span style={{ marginLeft: '10px' }}>Logout</span>}
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
