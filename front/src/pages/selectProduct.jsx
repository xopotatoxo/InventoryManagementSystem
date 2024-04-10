import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectProduct = () => {
    const navigate = useNavigate();

    const handleBook = () => {
        navigate("/ab");
    };

    const handleFood = () => {
        navigate("/af");
    };

    const handleClothing = () => {
        navigate("/ac");
    };

    return (
        <div>
            <button onClick={handleBook}>Books</button>
            <button onClick={handleFood}>Foods</button>
            <button onClick={handleClothing}>Clothing</button>
        </div>
    );
};

export default SelectProduct;
