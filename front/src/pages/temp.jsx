import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; // Import CSS file for styling

const InventoryManagementSystem = () => {
    const [currentPage, setCurrentPage] = useState('homepage');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get("http://localhost:8800/LOCATION");
                setLocations(response.data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get("http://localhost:8800/STORE");
                setStores(response.data);
            } catch (error) {
                console.error("Error fetching stores:", error);
            }
        };
        fetchStores();
    },[]);


    const showPage = (page) => {
        setCurrentPage(page);
    };

    const handleStoreSelection = (event) => {
        setSelectedStore(event.target.value);
    };

    const handleLocationSelection = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleAuthentication = (type) => {
        // Handle authentication logic based on the type (employee, manager, store)
        if (type === 'employee') {
            // Handle employee authentication
            console.log('Employee authentication');
        } else if (type === 'manager') {
            // Handle manager authentication
            console.log('Manager authentication');
        } else if (type === 'store') {
            // Handle store authentication
            console.log('Store authentication');
        }
    };

    return (
        <div className="inventory-management-system">
            <h1>Welcome to the Inventory Management System</h1>

            {/* Pages */}
            {/* Remaining code for other pages... */}
            {/* Pages */}
            <div id="homepage" style={{ display: currentPage === 'homepage' ? 'block' : 'none' }}>
                <p>Click next to proceed to store selection</p>
                <button onClick={() => showPage('storeSelection')}>Next</button>
            </div>

            {/* Store Selection */}
            <div id="storeSelection" style={{ display: currentPage === 'storeSelection' ? 'block' : 'none' }}>
                <p>Select Store:</p>
                <select id="storeOptions" value={selectedStore} onChange={handleStoreSelection}>
                    {stores.map(store => (
                        <option key={store.Name} value={store.Name}>
                            {store.Name}
                        </option>
                    ))}
                </select>
                <button onClick={() => showPage('locationSelection')}>Next</button>
                <button onClick={() => showPage('homepage')}>Back</button>
            </div>

            {/* Location Selection */}
            <div id="locationSelection" style={{ display: currentPage === 'locationSelection' ? 'block' : 'none' }}>
                <p>Select Location:</p>
                <select id="locationOptions" value={selectedLocation} onChange={handleLocationSelection}>
                    {locations.map(location => (
                        <option key={location.Location_ID} value={location.Location_ID}>
                            {location.Country}, {location.Province}, {location.City}
                        </option>
                    ))}
                </select>
                <button onClick={() => showPage('authentication')}>Next</button>
                <button onClick={() => showPage('storeSelection')}>Back</button>
            </div>

            {/* Authentication */}
            {/* Remaining code for authentication... */}
        </div>
    );
};

export default InventoryManagementSystem;
