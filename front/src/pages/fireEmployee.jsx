import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

const DeleteEmployee = () => {
    const [employeeId, setEmployeeId] = useState('');
    const navigate = useNavigate();

    const handleDeleteEmployee = async () => {
        try {
            await axios.delete(`http://localhost:8800/EMPLOYEE/${employeeId}`);
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert(`Failed to delete employee: ${err.message}`);
        }
    };

    const handleChange = (e) => {
        setEmployeeId(e.target.value);
    };

    const handleBack = () => {
        navigate("/mg");
    };

    return (
        <div>
            <h2>Delete Employee:</h2>
            <p>Please enter the ID of the employee you wish to remove.</p>
            <input type="text" id="employeeID" placeholder="Employee ID" value={employeeId} onChange={handleChange} />
            <button onClick={handleDeleteEmployee}>Delete Employee</button>
            <div><button onClick={handleBack}>Back</button></div>
        </div>
    );
};

export default DeleteEmployee;
