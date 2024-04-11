import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';

const AddFood = () => {
    const location = useLocation();
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

    // Initialize food state with empty values, setting Product_id with lastProductId
    const [food, setFood] = useState({
        Product_id: lastProductId, 
        Expiration: ''
    });

    // Update food state when any input field changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFood((prev) => ({
            ...prev,
            [id]: value
        }));
    };
    
    // Handle form submission
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // Ensure that Product_id is parsed as a number
            const parsedProductId = parseInt(food.Product_id);
            // Send a POST request to add the food
            await axios.post("http://localhost:8800/FOOD", { ...food, Product_id: parsedProductId });
            // Navigate back to the homepage after successful addition
            navigate("/ims");
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div className='form'>
            <h2>Add New Food:</h2>
            {/* Display the last generated Product_id */}
            <p>Last Generated Product ID: {lastProductId}</p>
            {/* Use the received product ID in the input field */}
            <input 
                type="number" 
                id="Product_id" 
                placeholder="Product ID"
                onChange={handleChange}
                value={food.Product_id} 
            />
            <p>Please enter the expiration date of the food you wish to add.</p>
            <input 
                type="text" 
                id="Expiration" 
                placeholder="Expiration Date" 
                onChange={handleChange} 
                value={food.Expiration}
            />
            {/* Button to submit the form */}
            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddFood;
