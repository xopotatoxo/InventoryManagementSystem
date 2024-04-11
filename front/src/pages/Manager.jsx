import React from "react";
import { useNavigate } from 'react-router-dom';

const Manager = () => {
    const navigate = useNavigate();

    const handleNewEmployee = () => {
        navigate("/ae");
    };

    const handleFire = () => {
        navigate("/de");
    };

    const handleDeleteProduct = () => {
        navigate("/dp");
    };

    const handleNewProduct = () => {
        navigate("/ap");
    };

    const handleNewRequest = () => {
        navigate("/ar");
    };

    const handleBack = () => {
        navigate("/ims");
    }
    return (
        <div>
        <h2>Verified Manager Page</h2>
        <p><button onClick={handleNewEmployee}>'Hire New Employee'</button></p>
        <p><button onClick={handleFire}>'Fire Existing Employee'</button></p>
        <p><button onClick={handleNewProduct}>'Add New Product'</button></p>
        <p><button onClick={handleNewRequest}>'Request New Product'</button></p>
        <p><button onClick={handleDeleteProduct}>'Delete No Longer Stocked Products'</button></p>
        <div><button onClick={handleBack}>Log Out</button></div>
        </div>
    )
}
export default Manager;