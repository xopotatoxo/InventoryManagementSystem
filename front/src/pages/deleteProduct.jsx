import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

const DeleteProduct = () => {
    const [productId, setProductId] = useState('');

    const navigate = useNavigate();


    const handleDeleteBook = async () => {
        try {
            await axios.delete(`http://localhost:8800/BOOK/${productId}`);
            await axios.delete(`http://localhost:8800/PRODUCT/${productId}`);
            window.location.reload(); // Reload the page after deleting the product
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteFood = async () => {
        try {
            await axios.delete(`http://localhost:8800/FOOD/${productId}`);
            await axios.delete(`http://localhost:8800/PRODUCT/${productId}`);
            window.location.reload(); // Reload the page after deleting the product
        } catch (err) {
            console.error(err);
            alert(`Failed to delete product: ${err.message}`);
        }
    };

    const handleDeleteClothing = async () => {
        try {
            await axios.delete(`http://localhost:8800/CLOTHING/${productId}`);
            await axios.delete(`http://localhost:8800/PRODUCT/${productId}`);
            window.location.reload(); // Reload the page after deleting the product
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setProductId(e.target.value);
    };

    const handleBack = () => {
        navigate("/mg");
    };

    return (
        <div>
            <h2>Delete No Longer Stocked Products:</h2>
            <p>Please enter the id of the product you wish to remove from the inventory.</p>
            <input type="number" id="productID" placeholder="Product ID" value={productId} onChange={handleChange} />
            <p>Please choose the type of the product you wish to remove from the inventory.</p>
            <button onClick={handleDeleteBook}>Book</button>
            <button onClick={handleDeleteFood}>Food</button>
            <button onClick={handleDeleteClothing}>Clothing</button>
            <div><button onClick={handleBack}>Back</button></div>
        </div>
    );
};

export default DeleteProduct;
