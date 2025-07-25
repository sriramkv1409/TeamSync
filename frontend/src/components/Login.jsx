import { useState } from "react";
import axios from "axios";
import Navbar1 from "./Navbar1";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleLogin(event) {
    event.preventDefault();
    try {
      const request = await axios.post("https://teamsync-zeoj.onrender.com/api/auth/login", {
        userName,
        password,
      });
      const token = request.data.token;
      const role = request.data.roles;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username",userName);
      console.log(request.data.username);
      console.log(request.data.roles);
      console.log(token);
      alert("Login Successful");
      navigate("/getemployees");
    } catch (e) {
      console.log("Login Error", e);
      alert("Invalid Cred");
    }
    console.log("Form Submitted");
  }
  return (
    <>
    <Navbar1/>
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center"> Login Form </h2>
            </div>

            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label"> Username</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 control-label"> Password </label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleLogin(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
              <p>Create an account??<Link to='/register'>Register</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default Login;