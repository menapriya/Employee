import React from "react";
import "./Dashboard.css"; // Add some basic styles
import { Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaEnvelope, FaTachometerAlt, FaBell, FaCog, FaUserCircle } from "react-icons/fa";
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul><li><Link to="/dashboard"className="lin"><FaTachometerAlt />Dashboard</Link></li>
            <li><Link to="/list"className="lin"><FaUser />Employees</Link></li>
            <li><Link to="/calendar"className="lin"><FaCalendarAlt />Calendar</Link></li>
            <li><Link to="/messages"className="lin"><FaEnvelope />Messages</Link></li>
          
          
        </ul>
      </aside>
      
      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <h1>Welcome to the Dashboard</h1>
        </header>
        <section className="content">
          <div className="card">Total Employees: 100</div>
          <div className="card">Pending Leaves: 5</div>
          <div className="card">Salary Processed: $50,000</div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
