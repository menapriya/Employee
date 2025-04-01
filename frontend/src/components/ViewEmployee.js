import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./ViewEmployee.css"; // Custom styling

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee details:", error);
        setError("Failed to fetch employee details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading employee details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="dashboard-container">
      <Sidebar active="employees" />
      <div className="content">
        <h2 className="section-title">
          <span className="icon">👤</span> Personal Information
        </h2>

        <div className="employee-card">
          {/* Employee Photo */}
          <div className="photo-section">
            <img
              src={`http://localhost:5000/uploads/${employee.photo}`}
              alt={employee.name}
              className="employee-photo"
              onError={(e) => (e.target.src = "/default-avatar.png")}
            />
          </div>

          {/* Employee Details */}
          <div className="info-section">
            <div className="info-grid">
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Employee ID:</strong> {employee.empID}</p>
              <p><strong>Department:</strong> {employee.department}</p>
              <p><strong>Designation:</strong> {employee.designation}</p>
              <p><strong>Project:</strong> {employee.project}</p>
              <p><strong>Type:</strong> {employee.type}</p>
              <p><strong>Status:</strong> {employee.status}</p>
            </div>
          </div>
        </div>

        {/* Back to List */}
        <Link to="/list" className="back-button">Back to Employee List</Link>
      </div>
    </div>
  );
};

export default ViewEmployee;
