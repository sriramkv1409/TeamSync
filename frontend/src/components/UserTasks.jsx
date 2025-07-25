  import React, { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';

  const UserTask = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const fetchTasks = () => {
      if (username && token) {
        axios.get(`https://teamsync-zeoj.onrender.com/api/tasks/username/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            setTasks(response.data);
          })
          .catch(error => {
            console.error("Error fetching tasks:", error);
            setError("Unable to load tasks. Please try again.");
          });
      } else {
        setError("You are not logged in.");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    useEffect(() => {
      fetchTasks();
    }, [username, token]);

    const markAsCompleted = (taskId) => {
      axios.put(`http://localhost:8080/api/tasks/status/${taskId}`, 
        'COMPLETED', 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(() => {
        fetchTasks(); // refresh tasks
      })
      .catch(error => {
        console.error("Error updating task:", error);
        setError("Failed to update task status.");
      });
    };

    return (
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Your Assigned Tasks</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {!error && tasks.length === 0 && (
          <div className="alert alert-info">No tasks assigned to you yet.</div>
        )}

        <div className="row">
          {tasks.map(task => (
            <div className="col-md-6 mb-4" key={task.taskId}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{task.description}</h5>
                  <p className="card-text">
                    <strong>Due Date:</strong> {task.dueDate}<br />
                    <strong>Status:</strong> {task.status}
                  </p>

                  {task.status === "PENDING" && (
                    <button
                      className="btn btn-success"
                      onClick={() => markAsCompleted(task.taskId)}
                    >
                      Mark as Completed
                    </button>
                  )}

                  {task.status === "COMPLETED" && (
                    <span className="badge bg-success">Completed</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default UserTask;
