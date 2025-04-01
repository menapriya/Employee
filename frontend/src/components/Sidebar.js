import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaEnvelope, FaTachometerAlt, FaBell, FaCog, FaUserCircle } from "react-icons/fa";
import "./Sidebar.css"; // Import Sidebar CSS

const Sidebar = ({ active }) => {
  return (
    <div className="sidebar-container">
      {/* Sidebar Section */}
      <div className="sidebar">
        <h2>RS-TECH</h2>
        <ul><li><Link to="/dashboard"className="lin"><FaTachometerAlt />Dashboard</Link></li>
            <li><Link to="/list"className="lin"><FaUser />Employees</Link></li>
            <li><Link to="/calendar"className="lin"><FaCalendarAlt />Calendar</Link></li>
            <li><Link to="/messages"className="lin"><FaEnvelope />Messages</Link></li>
          
          
        </ul>
      </div>

      {/* Topbar Section (Icons) */}
      <div className="topbar">
      <h1>Employee Management</h1>
        <div className="topbar-icons">
        <Link to="/notification"><FaBell className="icon"/></Link>
        <Link to="/settings"><FaCog className="icon" /></Link>
          <FaUserCircle className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
