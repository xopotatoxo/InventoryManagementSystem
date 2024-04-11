import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {

    const [lastManagerId, setLastManagerId] = useState('');

    const [employee, setEmployee] = useState({
        Username_id: '',
        Password: '',
        Name: '',
        Hired_by: '' // Constant value for Hired_by
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the data of the last added manager from the backend
        const fetchLastManager = async () => {
            try {
                const response = await axios.get("http://localhost:8800/MANAGERS");
                const lastManager = response.data[response.data.length - 1];
                if (lastManager) {
                    setEmployee(prevEmployee => ({
                        ...prevEmployee,
                        Hired_by: lastManager.managers_id // Update Hired_by with the ID of the last added manager
                    }));
                }
            } catch (error) {
                console.error("Error fetching last manager:", error);
            }
        };

        fetchLastManager();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleClick = async () => {
        try {
            await axios.post("http://localhost:8800/EMPLOYEE", employee);
            window.location.reload();
        } catch (err) {
            console.error("Error adding employee:", err);
        }
    };

    const handleBack = () => {
        navigate("/mg");
    };

    return (
        <div className='form'>
            <h2>Add New Employee:</h2>
            <p>Please enter the username of the employee you wish to add.</p>
            <input type="text" id="Username_id" placeholder="Username" value={employee.Username_id} onChange={handleChange} />
            <p>Please enter the password of the employee you wish to add.</p>
            <input type="password" id="Password" placeholder="Password" value={employee.Password} onChange={handleChange} />
            <p>Please enter the name of the employee you wish to add.</p>
            <input type="text" id="Name" placeholder="Name" value={employee.Name} onChange={handleChange} />
            <button onClick={handleClick}>Add</button>
            <div><button onClick={handleBack}>Back</button></div>
        </div>
    );
};

export default AddEmployee;
