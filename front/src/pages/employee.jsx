import React from "react";
import { useNavigate } from 'react-router-dom';

const Employee =()=>{

    const navigate = useNavigate();

    const handleNext = () => {
        navigate("/ue");
    }
    const handleBack = () => {
        navigate("/ims");
    }

    return(
        <div>
            <h2>Verified Employee Page</h2>
            <p><button onClick={handleNext}>Update Personal Information</button></p>
            <p><button onClick={handleBack}>Log Out</button></p>
        </div>
    )
}

export default Employee;