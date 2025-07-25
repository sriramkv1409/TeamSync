import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Import axios

const AssignTask = () => {
    // Hooks to get URL parameters and for navigation
    const { empId } = useParams();
    const navigate = useNavigate();

    // State for the form inputs
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // 1. Prepare the data in the format your backend expects (TaskDTO)
        const taskData = {
            empId: parseInt(empId), // Make sure empId is a number
            description: description,
            dueDate: dueDate,
        };

        // 2. Get the auth token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
            setError("Authentication error: No token found. Please log in again.");
            setIsLoading(false);
            return;
        }

        try {
            // 3. Make the POST request using axios
            await axios.post(
                'http://localhost:8080/api/tasks/assign',
                taskData, // The data is the second argument
                {
                    headers: {
                        'Authorization': `Bearer ${token}` // Headers are in the config object
                    }
                }
            );

            // 4. Handle success
            alert('Task assigned successfully!');
            navigate('/getemployees'); // Or wherever you list employees/tasks

        } catch (err) {
            // Axios places the server error response in err.response
            const errorMessage = err.response?.data?.message || 'Failed to assign task.';
            setError(errorMessage);
            console.error("Submission failed:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header">
                    <h3>Assign Task for Employee ID: {empId}</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="form-group mb-3">
                            <label htmlFor="description">Task Description</label>
                            <textarea
                                id="description"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="dueDate">Due Date</label>
                            <input
                                type="date"
                                id="dueDate"
                                className="form-control"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Assigning...' : 'Assign Task'}
                        </button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/getemployees')}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssignTask;