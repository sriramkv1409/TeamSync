import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
const GetEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8080/employee", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching employees", err);
        alert("Unauthorized or Error");
        navigate('/');
      }
    };

    fetchEmployees();
  }, [token]);

  const handleDelete = async (empId) => {
    try {
      await axios.delete(`http://localhost:8080/employee/${empId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(employees.filter((emp) => emp.empId !== empId));
      alert("Employee deleted successfully");
    } catch (err) {
      console.error("Error deleting employee", err);
      alert("Delete failed");
    }
  };

  const handleEdit = (empId) => {
    navigate(`/edit-employee/${empId}`);
  };

  const handleTask = (empId)=>{
    navigate(`/assign-task/${empId}`)
  }
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Employee List</h2>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {role === "ROLE_ADMIN" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.empId}>
                <td>{emp.empId}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.roles.map(role => role.roleName).join(', ')}</td>
                {role === "ROLE_ADMIN" && (
                  <td>
                    {role === "ROLE_ADMIN" && (
                      <button
                        onClick={() => handleDelete(emp.empId)}
                        className="btn btn-danger btn-sm "
                      >
                        Delete
                      </button>
                    )}

                    <button
                      onClick={() => handleEdit(emp.empId)}
                      className="btn btn-primary mx-2">Edit</button>

                    {emp.roles.some(r => r.roleName === 'ROLE_USER') && (
                      <button className="btn btn-success" onClick={()=> handleTask(emp.empId)}>Task</button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GetEmployees;