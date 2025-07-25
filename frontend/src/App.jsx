import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import GetEmployees from "./components/GetEmployees";
// import AddEmployee from "./components/AddEmployee";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import AddEmployees from "./components/AddEmployees";
import EditEmployee from "./components/EditEmployee";
import AssignTask from "./components/AssignTask";
import SearchTask from "./components/SearchTask";
import UserTask from "./components/UserTasks";
import Attendance from "./components/Attendance";


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddEmployees />} />
      <Route path="/getemployees" element={<GetEmployees/>}/>
      <Route path="/edit-employee/:empId" element={<EditEmployee/>}/>
      <Route path="/assign-task/:empId" element={<AssignTask/>}/>
      <Route path="/searchtask" element={<SearchTask/>}/>
      <Route path="/usertasks" element={<UserTask/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/attendance" element={<Attendance/>}/>
      <Route path="/register" element={<Signup />} />
    </Routes>
  </Router>
);

export default App;