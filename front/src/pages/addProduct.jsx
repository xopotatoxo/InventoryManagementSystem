import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [product, setProduct] = useState({
        Price: '',
        Quantity: '',
        Added_by: 1, // Constant value for Added_by
        Supplier: 'Supplier' // Constant value for Supplier
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [id]: id === "Price" ? parseFloat(value) : value
        }));
    };
    

    const handleClick = async () => {
        try {
            const response = await axios.post("http://localhost:8800/PRODUCT", product);
            const productId = response.data.productId; // Assuming the server returns the product ID
            console.log("Product ID:", productId); // Printing the generated product ID
            navigate("/ab", { state: { productId } }); // Navigating to addBook.jsx with product ID
        } catch (err) {
            console.log(product);
            console.log(err);
        }
    };

    return (
        <div className='form'>
            <h2>Add New Products:</h2>
            <p>Please enter the price of the product you wish to add.</p>
            <input type="number" id="Price" placeholder="Product Price" value={product.Price} onChange={handleChange} />
            <p>Please enter the quantity of the product you wish to add.</p>
            <input type="number" id="Quantity" placeholder="Product Quantity" value={product.Quantity} onChange={handleChange} />
            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddProduct;
