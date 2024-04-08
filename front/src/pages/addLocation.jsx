import React, { useEffect, useState } from "react"; // Import useState from React
import axios from 'axios';

const Location = () => {
    const [location, setLocation] = useState([])
    useEffect(()=>{
        const fetchAllLocation = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/LOCATION")
                setLocation(res.data);
                console.log(res);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllLocation()
    },[])
    return (
        <div>
            <h1>Location</h1>
            <div className="location">
                {location.map(location=>(
                    <div className="location" key = {location.Location_id}>
                        <p>{location.Country}, {location.Province}, {location.City}</p> 
                    </div>
                ))}
            </div>
            
        </div>
    )
}
export default Location;