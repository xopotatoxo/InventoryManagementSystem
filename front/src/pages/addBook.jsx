import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';

const AddBook = () => {
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

    // Initialize book state with empty values, setting Product_id with lastProductId
    const [book, setBook] = useState({
        Product_id: lastProductId, 
        Title: '', 
        Author: '', 
        Genre: ''
    });

    // Update book state when any input field changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setBook((prev) => ({
            ...prev,
            [id]: value
        }));
    };
    
    // Handle form submission
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to add the book
            await axios.post("http://localhost:8800/BOOK", book);
            // Navigate back to the homepage after successful addition
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div className='form'>
            <h2>Add New Book:</h2>
            {/* Display the last generated Product_id */}
            <p>Last Generated Product ID: {lastProductId}</p>
            {/* Use the received product ID in the input field */}
            <input 
                type="number" 
                id="Product_id" 
                placeholder="Product ID"
                onChange={handleChange}
                value={book.Product_id} 
            />
            <p>Please enter the title of the book you wish to add.</p>
            <input 
                type="text" 
                id="Title" 
                placeholder="Book Title" 
                onChange={handleChange} 
                value={book.Title}
            />
            <p>Please enter the author of the book you wish to add.</p>
            <input 
                type="text" 
                id="Author" 
                placeholder="Book Author" 
                onChange={handleChange} 
                value={book.Author}
            />
            <p>Please enter the genre of the book you wish to add.</p>
            <input 
                type="text" 
                id="Genre" 
                placeholder="Book Genre" 
                onChange={handleChange} 
                value={book.Genre}
            />
            {/* Button to submit the form */}
            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddBook;
