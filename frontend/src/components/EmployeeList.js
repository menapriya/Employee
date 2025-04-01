import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./EmployeeList.css";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/employees/${id}`);
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
      alert("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee. Check console for details.");
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    (emp.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (emp.empID?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (emp.department?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Sidebar active="employees" />
      <div className="content">
        <div className="header">
          <h2>Employee List</h2>
          <input
            type="text"
            placeholder="Search by Name, ID, or Department"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/add" className="add-button">Add Employee</Link>
        </div>

        {filteredEmployees.length === 0 ? (
          <p className="loading-text">No records found</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Project</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="profile-cell">
                      <img
                        src={`http://localhost:5000/uploads/${emp.photo}`}
                        alt={emp.name}
                        className="profile-pic"
                        onError={(e) => (e.target.src = "/default-avatar.png")}
                      />
                      <span>{emp.name}</span>
                    </td>
                    <td>{emp.empID}</td>
                    <td>{emp.department}</td>
                    <td>{emp.designation}</td>
                    <td>{emp.project}</td>
                    <td>{emp.type}</td>
                    <td>{emp.status}</td>
                    <td className="p-3 flex space-x-4">
                      {/* View Button */}
                      <Link to={`/view/${emp.id}`} className="view-button">
                        <FaEye className="text-green-500 cursor-pointer" />
                      </Link>

                      {/* Edit Button */}
                      <Link to={`/edit/${emp.id}`} className="edit-button">
                        <FaEdit className="text-blue-500 cursor-pointer" />
                      </Link>

                      {/* Delete Button */}
                      <FaTrash
                        className="delete-icon cursor-pointer text-red-500"
                        onClick={() => handleDelete(emp.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
