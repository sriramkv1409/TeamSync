import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const EditEmployee = () => {
  const { empId } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // State to hold form data. Matches your UserDetailsDto
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userName: "",
    password: "" // Keep password field for the DTO, but handle it carefully
  });

  useEffect(() => {
    // Fetch the current employee's data when the component loads
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/employee/${empId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Pre-fill the form with fetched data, excluding the password
        const { name, email, userName } = response.data;
        setFormData({ name, email, userName, password: "" }); // Don't pre-fill password
      } catch (err) {
        console.error("Error fetching employee data", err);
        alert("Could not fetch employee data.");
        navigate('/getemployees');
      }
    };
    fetchEmployeeData();
  }, [empId, token, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a payload. Only include the password if it's being changed.
    const payload = { ...formData };
    if (!payload.password) {
        delete payload.password; // Don't send an empty password
    }

    try {
      await axios.put(`http://localhost:8080/employee/${empId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Employee updated successfully!");
      navigate('/getemployees'); // Navigate back to the list
    } catch (err) {
      console.error("Error updating employee", err);
      alert("Update failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Edit Employee Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
           <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password (optional)</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
            />
          </div>
          <button type="submit" className="btn btn-success">Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default EditEmployee;