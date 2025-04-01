const express = require("express");
const { 
  getEmployees, 
  addEmployee, 
  getEmployeeById, 
  updateEmployee, 
  deleteEmployee, 
  upload 
} = require("../controllers/employeeController");

const router = express.Router();

router.get("/", getEmployees);
router.post("/add", upload.single("photo"), addEmployee); // Upload photo when adding
router.get("/:id", getEmployeeById);
router.put("/update/:id", upload.single("photo"), updateEmployee); // Upload new photo on update
router.delete("/:id", deleteEmployee);

module.exports = router;
