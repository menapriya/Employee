import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
  const { id } = useParams();  // Get employee ID from URL
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    empID: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
    photo: "",  // Store current photo filename
  });

  const [newPhoto, setNewPhoto] = useState(null); // Store selected new photo
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Employee Details
  useEffect(() => {
    axios.get(`http://localhost:5000/employees/${id}`)
      .then(response => {
        setEmployee(response.data); // Fill form with existing data
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching employee data:", error);
        setError("Failed to fetch employee data.");
        setLoading(false);
      });
  }, [id]);

  // Handle Input Change
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // Handle Photo Selection
  const handleFileChange = (e) => {
    setNewPhoto(e.target.files[0]); // Store selected file
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("empID", employee.empID);
    formData.append("department", employee.department);
    formData.append("designation", employee.designation);
    formData.append("project", employee.project);
    formData.append("type", employee.type);
    formData.append("status", employee.status);
    if (newPhoto) {
      formData.append("photo", newPhoto); // Append new photo only if selected
    }

    axios.put(`http://localhost:5000/employees/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(() => {
      alert("Employee updated successfully!");
      navigate("/list"); // Redirect to Employee List
    })
    .catch(error => console.error("Error updating employee:", error));
  };

  if (loading) return <p>Loading employee data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {/* Current Photo */}
      {employee.photo && (
        <div>
          <p>Current Photo:</p>
          <img
            src={`http://localhost:5000/uploads/${employee.photo}`}
            alt="Employee"
            className="profile-pic"
            onError={(e) => (e.target.src = "/default-avatar.png")} // Fallback image
          />
        </div>
      )}

      <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="empID" value={employee.empID} onChange={handleChange} placeholder="Employee ID" required />
      <input type="text" name="project" value={employee.project} onChange={handleChange} placeholder="Project" />

      <select name="department" value={employee.department} onChange={handleChange} required>
        <option value="">Select Department</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
        <option value="Operations">Operations</option>
      </select>

      <select name="designation" value={employee.designation} onChange={handleChange} required>
        <option value="">Select Designation</option>
        <option value="Intern">Intern</option>
        <option value="Junior Developer">Junior Developer</option>
        <option value="Senior Developer">Senior Developer</option>
        <option value="Manager">Manager</option>
        <option value="Team Lead">Team Lead</option>
        <option value="HR Executive">HR Executive</option>
      </select>

      <select name="type" value={employee.type} onChange={handleChange} required>
        <option value="">Select Type</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Contract">Contract</option>
      </select>

      <select name="status" value={employee.status} onChange={handleChange} required>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      {/* New Photo Upload */}
      <input type="file" name="photo" accept="image/*" onChange={handleFileChange} />

      <button type="submit">Update Employee</button>
    </form>
  );
};

export default EditEmployee;
