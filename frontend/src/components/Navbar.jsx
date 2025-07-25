import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const savedRoles = localStorage.getItem("role");
    if (savedRoles) {
      try {
        setRoles(savedRoles);
      } catch (e) {
        console.error("Error parsing roles", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isAdmin = roles.includes("ROLE_ADMIN");
  const isUser = roles.includes("ROLE_USER");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">TeamSync</Link>
        <ul className="navbar-nav">

          {/* Common to all */}
          <li className="nav-item"><Link className="nav-link" to="/getemployees">EmployeeList</Link></li>

          {/* Admin only */}
          {isAdmin && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/add">AddEmployees</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/searchtask">Tasks</Link></li>
            </>
          )}

          {/* User only */}
          {isUser && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/usertasks">UserTasks</Link></li>
            </>
          )}
          <li className="nav-item"><Link className="nav-link" to="/attendance">Attendance</Link></li>

          <li className="nav-item"><Link onClick={handleLogout} className="nav-link" to="/">Logout</Link></li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
