import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './style.css';
import scriptFunctions from './scriptFunctions'; 
import { Link } from 'react-router-dom';

const InventoryManagementSystem = () => {
    const [currentPage, setCurrentPage] = useState('homepage');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [stores, setStores] = useState([]);
    const [book, setBook] = useState([]);
    const [authType, setAuthType] = useState('');

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

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get("http://localhost:8800/BOOK");
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching stores:", error);
            }
        };
        fetchBook();
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
    const verifiedEmployeeButtonRef = useRef(null);
    const verifiedManagerButtonRef = useRef(null);

    const handleAuthentication = async (type) => {
        setAuthType(type);
        let nextPage;
        if (type === 'employee') {
            console.log('Employee authentication'); // Debugging statement
            try {
                const username = document.getElementById(`Username`).value;
                const password = document.getElementById(`Password`).value;
                if (username === '123' && password === '123'){
                    nextPage='employeeSuccess';
                }
                else{
                    nextPage='authentication';
                }
            } catch (error) {
                
                console.error('Error authenticating employee:', error);
            }
        } else if (type === 'manager') {
            console.log('Manager authentication');
            try {
                const username = document.getElementById(`${type}Username`).value;
                const password = document.getElementById(`${type}Password`).value;
                if (username === '123' && password === '123'){
                    nextPage='managerSuccess';
                }
                else{
                    nextPage='authentication';
                }
            } catch (error) {
                console.error('Error authenticating manager:', error);
            }
        } else if (type === 'store') {
            console.log('Store authentication');
            try {
                const username = document.getElementById(`${type}Username`).value;
                const password = document.getElementById(`${type}Password`).value;
                if (username === '123' && password === '123'){
                    nextPage='storeSuccess';
                }
                else{
                    nextPage='authentication';
                }
            } catch (error) {
                console.error('Error authenticating store:', error);
            }
        }
        showPage(nextPage);
    };
    
    
    const handleProductVerification = () => {
        //product verification logic here
        console.log('Product verification');
    };

    return (
        <div className="inventory-management-system">
            <h1>Welcome to the Inventory Management System</h1>

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
            <div id="authentication" style={{ display: currentPage === 'authentication' ? 'block' : 'none' }}>
                <p>Select Authentication:</p>
                <button id = "employee" onClick={()=>showPage('employeeOptions')}>Employee</button>
                <button id = "manager" onClick={()=>showPage('managerOptions')}>Manager</button>
                <button id = "store" onClick={()=>showPage('storeOptions')}>Store</button>
                <button onClick={() => showPage('locationSelection')}>Back</button>
            </div>


            <div id="managerOptions" style={{ display: currentPage === 'managerOptions' ? 'block' : 'none' }}>
                <p>Manager Options:</p>
                <input type="text" id="managerUsername" placeholder="Username" />
                <input type="password" id="managerPassword" placeholder="Password" />
                <button onClick={() => handleAuthentication('manager')}>Verify</button>
                <p><button onClick={() => showPage('authentication')}>Back</button></p>
            </div>

            <div id="managerSuccess" style={{ display: currentPage === 'managerSuccess' ? 'block' : 'none' }}>
                <h2 id="verifiedManagerButton" ref={verifiedManagerButtonRef}>Verified</h2>
                <p><button><Link to="/mg">'Proceed as Manager'</Link></button></p>
                <p><button onClick={() => showPage('authentication')}>Log out</button></p>
            </div>


            <div id="requestProduct" style={{ display: currentPage === 'requestProduct' ? 'block' : 'none' }}>
                
                <h2>Request Product:</h2>
                <p>Please enter the name of the manufacturer from whom you are requesting a product.</p>
                <input id="manuName" placeholder="Manufacturer name"/>
                <button onClick={()=> showPage('managerOptions')}>Make request</button>
                <button onClick={()=> showPage('managerSuccess')}>back</button>
            </div>

            <div id="employeeOptions" style={{ display: currentPage === 'employeeOptions' ? 'block' : 'none' }}>
                <p>Employee Options:</p>
                <input type="text" id="Username" placeholder="Username" />
                <input type="password" id="Password" placeholder="Password" />
                <button onClick={() => handleAuthentication('employee')}>Verify</button>
                <p><button onClick={() => showPage('authentication')}>Back</button></p>
            </div>


            <div id="employeeSuccess" style={{ display: currentPage === 'employeeSuccess' ? 'block' : 'none' }}>
                <h2 id="verifiedEmployeeButton" ref={verifiedEmployeeButtonRef}>Verified</h2>
                <button><Link to="/ue">'Update Employee Information'</Link></button>
                <button onClick={() => showPage('authentication')}>Log out</button>
            </div>

    
            <div id="storeOptions" style={{ display: currentPage === 'storeOptions' ? 'block' : 'none' }}>
                <p>Store Options:</p>
                <input type="text" id="storeUsername" placeholder="Username"/>
                <input type="password" id="storePassword" placeholder="Password"/>
                <button onClick={() => handleAuthentication('store')}>Verify</button>
                <p><button onClick={() => showPage('authentication')}>Back</button></p>
                <h2 id="verifiedProductButton" style={{ display: 'none' }}>Verified</h2>
                
            </div>

            <div id="storeSuccess" style={{ display: currentPage === 'storeSuccess' ? 'block' : 'none' }}>
                <button><Link to="/sa">'Search Product'</Link></button>
                <button><Link to="/up">'Update Product Information'</Link></button>
                <button onClick={() => showPage('authentication')}>Log out</button>
            </div>
        </div>
    );
};

export default InventoryManagementSystem;