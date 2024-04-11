import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [productId, setProductId] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newQuantity, setNewQuantity] = useState('');
    const navigate = useNavigate();

    const handleUpdateProduct = async () => {
        try {
            await axios.patch(`http://localhost:8800/PRODUCT/${productId}`, {
                Price: newPrice,
                Quantity: newQuantity
            });
            alert('Product updated successfully');
            window.location.reload();
            // Optionally, you can navigate back to the inventory management system page or perform any other action.
        } catch (err) {
            console.error(err);
            alert(`Failed to update product: ${err.message}`);
        }
    };

    const handleChangeId = (e) => {
        setProductId(e.target.value);
    };

    const handleChangePrice = (e) => {
        setNewPrice(e.target.value);
    };

    const handleChangeQuantity = (e) => {
        setNewQuantity(e.target.value);
    };

    const handleBack = () => {
        navigate("/str");
    };

    return (
        <div>
            <h2>Update Product:</h2>
            <p>Please enter the ID of the product you wish to update.</p>
            <input type="text" id="productId" placeholder="Product ID" value={productId} onChange={handleChangeId} />
            <input type="text" placeholder="New Price" value={newPrice} onChange={handleChangePrice} />
            <input type="text" placeholder="New Quantity" value={newQuantity} onChange={handleChangeQuantity} />
            <button onClick={handleUpdateProduct}>Update Product</button>
            <div><button onClick={handleBack}>Back</button></div>
        </div>
    );
};

export default UpdateProduct;
