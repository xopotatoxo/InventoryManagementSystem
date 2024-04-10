import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

const AddRequest = () => {
    const [manufacturer, setManufacturer] = useState({
        Name: '',
        Supplies_by: '', // This line had a typo
        Request_by: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLastManager = async () => {
            try {
                const response = await axios.get("http://localhost:8800/MANAGERS");
                const lastManager = response.data[response.data.length - 1];
                if (lastManager) {
                    setManufacturer(prevManufacturer => ({
                        ...prevManufacturer,
                        Supplies_by: lastManager.managers_id,
                        Request_by: lastManager.managers_id
                    }));
                }
            } catch (error) {
                console.error("Error fetching last manager:", error);
            }
        };

        fetchLastManager();
    }, []); // Removed axios from the dependency array since it's not used inside the useEffect

    const handleChange = (e) => {
        setManufacturer((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }));
    };
    
    const handleClick = async () => {
        try {
            await axios.post("http://localhost:8800/MANUFACTURER", manufacturer);
            navigate("/ims"); 
        } catch (err) {
            console.log(err);
        }
    };

    const handleBack = () => {
        navigate("/mg");
    };

    return (
        <div className='form'>
            <h2>Request Manufacturer:</h2>
            <p>Please enter the name of the manufacturer from whom you are requesting a product.</p>
            <input type="text" placeholder="Manufacturer name" onChange={handleChange} name="Name" />
            <button onClick={handleClick}>Request</button>
            <div><button onClick={handleBack}>Back</button></div>
        </div>
    );
};

export default AddRequest;
