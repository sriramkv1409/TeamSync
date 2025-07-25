import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const SearchTask = () => {
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const handleSearch = async () => {
    if (!username.trim()) {
      setError('Please enter a username');
      setTasks([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`https://teamsync-zeoj.onrender.com/api/tasks/username/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('No tasks found or error fetching tasks.');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

const handleDelete = async (taskId) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`https://teamsync-zeoj.onrender.com/api/tasks/delete/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    alert("Task deleted successfully.");
    // Refresh task list
    handleSearch();
  } catch (error) {
    console.error("Error deleting task:", error);
    alert("Failed to delete task.");
  }
};

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">🔍 Search Tasks by Username</h2>

        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleSearch}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {tasks.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>TaskID</th>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.taskId}>
                    <td>{task.taskId}</td>
                    <td>{task.description}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.status}</td>
                    <td>
                      <button className="btn btn-primary" onClick={()=>handleDelete(task.taskId)}>Remove task</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tasks.length === 0 && !error && (
          <div className="text-center text-muted">
            <p>No tasks to display</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchTask;
