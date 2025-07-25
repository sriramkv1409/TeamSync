import { Link,useNavigate } from "react-router-dom";

const Navbar2 = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.clear(); //removes all the data stored
    navigate('/');
  }
  return(
    <>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">TeamSync</Link>
      <ul className="navbar-nav">
        <li className="nav-item"><Link onClick={handleLogout} className="nav-link" to="/">Logout</Link></li>
        <li className="nav-item"><Link  className="nav-link" to="/login">Login</Link></li>
        {/* <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li> */} 
      </ul>
    </div>
  </nav>
  </>
  )
};

export default Navbar2;