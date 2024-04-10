import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

const AddClothing = () => {
    const navigate = useNavigate();

    // Initialize lastProductId state
    const [lastProductId, setLastProductId] = useState('');

    // Fetch the last generated Product_id from the backend
    useEffect(() => {
        const fetchLastProductId = async () => {
            try {
                const response = await axios.get("http://localhost:8800/PRODUCT");
                // Assuming the response contains an array of products and you want the last one
                const lastProduct = response.data[response.data.length - 1];
                setLastProductId(lastProduct.Product_id);
            } catch (err) {
                console.log(err);
            }
        };
        fetchLastProductId();
    }, []);

    // Initialize clothing state with empty values, setting Product_id with lastProductId
    const [clothing, setClothing] = useState({
        Product_id: lastProductId, 
        Size: '', 
        Colour: '', 
        Style: ''
    });

    // Update clothing state when any input field changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setClothing((prev) => ({
            ...prev,
            [id]: value
        }));
    };
    
    // Handle form submission
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to add the clothing
            await axios.post("http://localhost:8800/CLOTHING", clothing);
            // Navigate back to the homepage after successful addition
            navigate("/ims");
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div className='form'>
            <h2>Add New Clothing:</h2>
            {/* Display the last generated Product_id */}
            <p>Last Generated Product ID: {lastProductId}</p>
            {/* Use the received product ID in the input field */}
            <input 
                type="number" 
                id="Product_id" 
                placeholder="Product ID"
                onChange={handleChange}
                value={clothing.Product_id} 
            />
            <p>Please enter the size of the clothing you wish to add.</p>
            <input 
                type="text" 
                id="Size" 
                placeholder="Clothing Size" 
                onChange={handleChange} 
                value={clothing.Size}
            />
            <p>Please enter the colour of the clothing you wish to add.</p>
            <input 
                type="text" 
                id="Colour" 
                placeholder="Clothing Colour" 
                onChange={handleChange} 
                value={clothing.Colour}
            />
            <p>Please enter the style of the clothing you wish to add.</p>
            <input 
                type="text" 
                id="Style" 
                placeholder="Clothing Style" 
                onChange={handleChange} 
                value={clothing.Style}
            />
            {/* Button to submit the form */}
            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddClothing;
