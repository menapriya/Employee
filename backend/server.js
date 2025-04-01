const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/employees", employeeRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
