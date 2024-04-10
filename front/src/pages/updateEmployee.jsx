import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleUpdateEmployee = async () => {
        try {
            await axios.patch(`http://localhost:8800/EMPLOYEE/${employeeId}`, {
                Name: newName,
                Password: newPassword
            });
            window.location.reload();
            // Optionally, you can navigate back to the inventory management system page or perform any other action.
        } catch (err) {
            console.error(err);
            alert(`Failed to update employee: ${err.message}`);
        }
    };

    const handleChangeId = (e) => {
        setEmployeeId(e.target.value);
    };

    const handleChangeName = (e) => {
        setNewName(e.target.value);
    };

    const handleChangePassword = (e) => {
        setNewPassword(e.target.value);
    };

    const handleBack = () => {
        navigate("/ims");
    };

    return (
        <div>
            <h2>Update Employee:</h2>
            <p>Please enter the ID of the employee you wish to update.</p>
            <input type="text" id="employeeID" placeholder="Employee ID" value={employeeId} onChange={handleChangeId} />
            <input type="text" placeholder="New Name" value={newName} onChange={handleChangeName} />
            <input type="text" placeholder="New Password" value={newPassword} onChange={handleChangePassword} />
            <button onClick={handleUpdateEmployee}>Update Employee</button>
            <div><button onClick={handleBack}>Back</button></div>
        </div>
    );
};

export default UpdateEmployee;
