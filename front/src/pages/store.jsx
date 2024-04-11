import React from "react";
import { useNavigate } from "react-router-dom";

const Store = () => {
    const navigate = useNavigate();

    const handleSearchProduct = () =>{
        navigate("/sa");
    }

    const handleProductInformation = () =>{
        navigate("/up");
    }

    const handleBack = () => {
        navigate("/ims");
    }

    return (
        <div>
            <h2>Verified Store</h2>
            <p><button onClick={handleSearchProduct}>Search Product</button></p>
            <p><button onClick={handleProductInformation}>Update Product Information</button></p>
            <p><button onClick={handleBack}>Log Out</button></p>
            
        </div>
    )
}
export default Store;