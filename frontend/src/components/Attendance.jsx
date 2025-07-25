import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const [attendance, setAttendance] = useState(null);
  const [allAttendance, setAllAttendance] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchAttendance = async () => {
    try {
      if (role === "ROLE_ADMIN") {
        const res = await axios.get("http://localhost:8080/api/attendance/today", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllAttendance(res.data);
      } else {
        const res = await axios.get(`http://localhost:8080/api/attendance/today/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAttendance(res.data);
      }

      setError("");
    } catch (err) {
      setAttendance(null);
      setAllAttendance([]);
      setError("Unable to fetch attendance");
    }
  };

  const handleCheckIn = async () => {
    try {
      await axios.post(`http://localhost:8080/api/attendance/check-in/${username}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Checked in successfully");
      fetchAttendance();
    } catch (err) {
      setMessage("Check-In failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      await axios.post(`http://localhost:8080/api/attendance/check-out/${username}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Checked out successfully");
      fetchAttendance();
    } catch (err) {
      setMessage("Check-Out failed");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center">Attendance</h2>

        {(role === "ROLE_USER" || role === "ROLE_ADMIN") && (
          <div className="text-center my-3">
            <button className="btn btn-success me-2" onClick={handleCheckIn}>
              Check In
            </button>
            <button className="btn btn-danger" onClick={handleCheckOut}>
              Check Out
            </button>
          </div>
        )}

        {message && <p className="text-center text-success">{message}</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {/* 🧍 User view */}
        {role === "ROLE_USER" && (
          <div className="mt-4">
            <p>
              <strong>Date:</strong> {attendance ? attendance.date : "—"}
            </p>
            <p>
              <strong>Check-In:</strong>{" "}
              {attendance && attendance.checkIn
                ? new Date(attendance.checkIn).toLocaleTimeString()
                : "Not Checked In"}
            </p>
            <p>
              <strong>Check-Out:</strong>{" "}
              {attendance && attendance.checkOut
                ? new Date(attendance.checkOut).toLocaleTimeString()
                : "Not Checked Out"}
            </p>
            <p>
              <strong>Total Hours:</strong>{" "}
              {attendance && attendance.totalHours
                ? attendance.totalHours + " hrs"
                : "—"}
            </p>
          </div>
        )}

        {/* 👑 Admin view */}
        {role === "ROLE_ADMIN" && (
          <div className="mt-4">
            <h4 className="mb-3">All Employees Attendance (Today)</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Date</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Total Hours</th>
                </tr>
              </thead>
              <tbody>
                {allAttendance.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  allAttendance.map((record, index) => (
                    <tr key={index}>
                      <td>{record.employee?.userName}</td>
                      <td>{record.date}</td>
                      <td>
                        {record.checkIn
                          ? new Date(record.checkIn).toLocaleTimeString()
                          : "—"}
                      </td>
                      <td>
                        {record.checkOut
                          ? new Date(record.checkOut).toLocaleTimeString()
                          : "—"}
                      </td>
                      <td>{record.totalHours ? record.totalHours + " hrs" : "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
