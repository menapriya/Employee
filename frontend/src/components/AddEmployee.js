import React, { useState } from "react";
import axios from "axios";
import "./AddEmployee.css";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [employee, setEmployee] = useState({
    name: "",
    empID: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
    photo: null, // Store file
  });

  const departments = ["HR", "IT", "Finance", "Marketing", "Operations"];
  const designations = ["Intern", "Junior Developer", "Senior Developer", "Manager", "Team Lead", "HR Executive"];
  const types = ["Full-Time", "Part-Time", "Contract"];
  const statuses = ["Active", "Inactive"];

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEmployee({ ...employee, photo: e.target.files[0] });
  };

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
    formData.append("photo", employee.photo); // Ensure this is a File object
  
    axios
      .post("http://localhost:5000/employees/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Employee added successfully");
        navigate("/list");
      })
      .catch((error) => {
        console.error("Axios error:", error.response ? error.response.data : error);
        alert("Error adding employee");
      });
  };
  

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
       <div className="photo-upload">
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            id="photo-input"
            style={{ display: "none" }}
          />
          <div className="photo-preview" onClick={() => document.getElementById("photo-input").click()}>
            {preview ? <img src={preview} alt="Preview" className="preview-image" /> : <p>Choose File</p>}
          </div>
        </div>

      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="empID" placeholder="Employee ID" onChange={handleChange} required />
      
      <select name="department" onChange={handleChange} required>
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>

      <select name="designation" onChange={handleChange} required>
        <option value="">Select Designation</option>
        {designations.map((desig) => (
          <option key={desig} value={desig}>{desig}</option>
        ))}
      </select>

      <input type="text" name="project" placeholder="Project" onChange={handleChange} />

      <select name="type" onChange={handleChange} required>
        <option value="">Select Type</option>
        {types.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <select name="status" onChange={handleChange} required>
        <option value="">Select Status</option>
        {statuses.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>

      {/* File Upload Input */}
     

      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;