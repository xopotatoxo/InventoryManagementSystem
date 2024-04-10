import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProductDetails = () => {
    const [productId, setProductId] = useState('');
    const [productInfo, setProductInfo] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleProductIdChange = (e) => {
        setProductId(e.target.value);
    };

    const fetchProductInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8800/PRODUCT/${productId}`);
            setProductInfo(response.data);
            setError('');
        } catch (err) {
            setError(`Failed to fetch product details: ${err.message}`);
            setProductInfo(null);
        }
    };

    const handleBack = () => {
        navigate("/ims");
    };

    const renderValue = (value) => {
        if (typeof value === 'object') {
            return JSON.stringify(value); // Render nested objects as string
        }
        return value; // Render other types directly
    };

    return (
        <div>
            <h2>Product Details:</h2>
            <div>
                <label htmlFor="productId">Product ID:</label>
                <input
                    type="text"
                    id="productId"
                    value={productId}
                    onChange={handleProductIdChange}
                />
                <button onClick={fetchProductInfo}>Fetch Product Info</button>
            </div>
            {error && <p>{error}</p>}
            {productInfo && (
                <div>
                    <h3>Product Information:</h3>
                    <ul>
                        {Object.entries(productInfo).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {renderValue(value)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div><button onClick={handleBack}>Back</button></div>
        </div>
    );
};

export default ProductDetails;
