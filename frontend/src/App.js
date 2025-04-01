import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import Sidebar from "./components/Sidebar";
import EditEmployee from "./components/EditEmployee";
import Settings from "./components/Settings";
import Notification from "./components/Notification";
import Dashboard from "./components/Dashboard";
import ViewEmployee from "./components/ViewEmployee";


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/settings" element={<Settings/>} />
      <Route path="/" element={<Sidebar/>} />
        <Route path="/list" element={<EmployeeList />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
       <Route path="/notification" element={<Notification/>}/>
       <Route path="/dashboard" element={<Dashboard/>}/>
       <Route path="/view/:id" element={<ViewEmployee/>}/>
       
      </Routes>
    </Router>
  );
};

export default App;
