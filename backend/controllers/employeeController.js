const db = require("../db");
const multer = require("multer");
const path = require("path");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Get all employees
exports.getEmployees = (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Add employee with photo upload
exports.addEmployee = (req, res) => {
  const { name, empID, department, designation, project, type, status } = req.body;
  const photo = req.file ? req.file.filename : null;

  db.query(
    "INSERT INTO employees (name, empID, department, designation, project, type, status, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [name, empID, department, designation, project, type, status, photo],
    (err, result) => {
      if (err) {
        console.error("Database Insertion Error:", err);  // 🔴 Log the actual error
        return res.status(500).json({ message: "Server error", error: err });
      }
      res.json({ message: "Employee added successfully!", id: result.insertId });
    }
  );
};

// Get employee by ID
exports.getEmployeeById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM employees WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: "Employee not found" });
    res.json(result[0]);
  });
};

// Update employee details (including photo)
exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, empID, department, designation, project, type, status } = req.body;
  const photo = req.file ? req.file.filename : req.body.photo; // Update only if new file is uploaded

  db.query(
    "UPDATE employees SET name = ?, empID = ?, department = ?, designation = ?, project = ?, type = ?, status = ?, photo = ? WHERE id = ?",
    [name, empID, department, designation, project, type, status, photo, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Employee updated successfully!" });
    }
  );
};

// Middleware for handling file upload

// Delete employee
exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM employees WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully!" });
  });
};

// Export the multer upload middleware
exports.upload = upload;
