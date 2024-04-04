import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import scriptFunctions from './scriptFunctions'; 

const InventoryManagementSystem = () => {
    const [currentPage, setCurrentPage] = useState('homepage');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [stores, setStores] = useState([]);
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
        // Set the authentication type
        setAuthType(type);
        
        // Determine the next page based on the selected authentication type
        let nextPage = 'locationSelection';
        if (type === 'employee') {
            // Handle employee authentication
            console.log('Employee authentication');
        } else if (type === 'manager') {
            // Handle manager authentication
            console.log('Manager authentication');
            // Set nextPage to 'managerOptions' for the manager authentication
            nextPage = 'managerOptions';
        } else if (type === 'store') {
            // Handle store authentication
            console.log('Store authentication');
        }
        
        // Transition to the next page
        showPage(nextPage);
    };
    
    const handleProductVerification = () => {
        //product verification logic here
        console.log('Product verification');
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
            <div id="authentication" style={{ display: currentPage === 'authentication' ? 'block' : 'none' }}>
                <p>Select Authentication:</p>
                <button onClick={() => handleAuthentication('employee')}>Employee</button>
                <button onClick={() => handleAuthentication('manager')}>Manager</button>
                <button onClick={() => handleAuthentication('store')}>Store</button>
                <button onClick={() => showPage('locationSelection')}>Back</button>
            </div>
            




            <div id="managerOptions" style= {{ display: currentPage === 'managerOptions' ? 'block' : 'none' }}>
            <p>Manager Options:</p>
            <input type="text" id="managerUsername" placeholder="Username"/>
            <input type="password" id="managerPassword" placeholder="Password"/>
            <button onClick={() => scriptFunctions.authenticateManager()}>Verify</button>
            <button id="verifiedManagerButton" style={{ display: 'none' }}>Verified</button>
            <button id="requestsProducts" style={{display: 'none'}} onClick={() => showPage('requestProduct')}>Requests Products</button>

            <button id="fireEmployees" style={{display: 'none'}} onClick={()=> showPage('fireEmployee')}>Fire Employees</button>
            <button id="hireEmployees" style={{display: 'none'}} onClick={()=> showPage('hireEmployee')}>Hire Employees</button>
            <button id="addNewProducts" style={{display: 'none'}} onClick={()=> showPage('addNewProducts')}>Add new products</button>
            <button id="deleteNoLongerStockedProducts" style={{display: 'none'}} onClick={()=> showPage('deleteProducts')}>Delete no longer stocked products</button>
            <button onClick={()=>showPage('authentication')}>log out</button>
            </div>
            <div id="requestProduct" style={{ display: currentPage === 'requestProduct' ? 'block' : 'none' }}>
                
                <h2>Request Product:</h2>
                <p>Please enter the name of the manufacturer from whom you are requesting a product.</p>
                <input id="manuName" placeholder="Manufacturer name"/>
                <button onClick={()=> showPage('managerOptions')}>Make request</button>
            </div>
            <div id="fireEmployee" style={{ display: currentPage === 'fireEmployee' ? 'block' : 'none' }}>
                <h2>Fire Employee:</h2>
                <p>Please select the employee you wish to fire.</p>
                <input id="employeeName" placeholder="Employee name"/>
                <button onClick={()=> showPage('managerOptions')}>Fire Employee</button>
            </div>
            <div id= "hireEmployee" style={{display: currentPage === 'hireEmployee' ? 'block' : 'none'}}>
                <h2>Hire Employee:</h2>
                <p>Please enter the username of the employee you wish to hire.</p>
                <input id="employeeUsername" placeholder="Employee username"/>
                <p>Please enter the password for the employee you wish to hire.</p>
                <input id="employeePassword" placeholder="Employee password"/>
                <p>Please enter the full name of the employee you wish to hire</p>
                <input id="employeeName" placeholder="Employee name"/>
                {/* the manager's name should already be available as they're logged in*/}
                <button onClick={()=> showPage('managerOptions')}>Hire Employee</button>
            </div>
            <div id="addNewProducts" style={{display: currentPage === 'addNewProducts' ? 'block' : 'none'}}>
                <h2>Add New Products:</h2>
                <p>Please enter the price of the product you wish to add.</p>
                <input id="productPrice" placeholder="Product Price"/>
                <p>Please enter the quantity of the product you wish to add.</p>
                <input id="productQuantity" placeholder="Product Quantity"/>
                <p>Please select the type of the product you wish to add.</p>
                <button onClick={()=> showPage('book')}>Book</button>
                <button onClick={()=> showPage('food')}>Food</button>
                <button onClick={()=> showPage('clothing')}>Clothing</button>
            </div>
            <div id="book" style={{display: currentPage === 'book' ? 'block' : 'none'}}> 
                <h2>Add New Book:</h2>
                <p>Please enter the title of the book you wish to add.</p>
                <input id="bookTitle" placeholder="Book Title"/>
                <p>Please enter the author of the book you wish to add.</p>
                <input id="bookAuthor" placeholder="Book Author"/>
                <p>Please enter the genre of the book you wish to add.</p>
                <input id="bookGenre" placeholder="Book Genre"/>
                <button onClick={()=> showPage('managerOptions')}>Add Book</button>
            </div>
            <div id="food" style={{display: currentPage === 'food' ? 'block' : 'none'}}>
                <h2>Add New Food:</h2>
                <p>Please enter the expiration date of the food you wish to add.</p>
                <input id="foodExpDate" placeholder="Food Expiration Date"/>
                <button onClick={()=> showPage('managerOptions')}>Add Food</button>
            </div>
            <div id="clothing" style={{display: currentPage === 'clothing' ? 'block' : 'none'}}> 
            <h2>Add New Clothing:</h2>
            <p>Please enter the size of the clothing you wish to add.</p>
            <input id="clothingSize" placeholder="Clothing Size"/>
            <p>Please enter the colour of the clothing you wish to add.</p>
            <input id="clothingColour" placeholder="Clothing Colour"/>
            <p>Please enter the style of the clothing you wish to add.</p>
            <input id="clothingStyle" placeholder="Clothing Style"/>
            <button onClick={()=> showPage('managerOptions')}>Add Clothing</button>
            </div>
            <div id="deleteProducts" style={{display: currentPage === 'deleteProducts' ? 'block' : 'none'}}>
                <h2>Delete No Longer Stocked Products:</h2>
                <p>Please enter the id of the product you wish to remove from the inventory.</p>
                <input id="productID" placeholder="Product ID"/>
                <button onClick={()=> showPage('managerOptions')}>Delete Product</button>
            </div>

            
            {/*delete later only for test
            <div id="managerOptions" style={{ display: currentPage ==='managerOptions' ? 'block' : 'none' }}>
                <p>Manager Options:</p>
                <input type="text" id="managerUsername" placeholder="Username" />
                <input type="password" id="managerPassword" placeholder="Password" />
                <button onClick={() => scriptFunctions.authenticateManager()}>Verify</button>
                <button id="verifiedManagerButton" style={{ display: 'none' }}>Verified</button>
                <button id="requestsProducts" style={{ display: 'none' }}>Requests Products</button>
                <button id="fireEmployees" style={{ display: 'none' }}>Fire Employees</button>
                <button id="hireEmployees" style={{ display: 'none' }}>Hire Employees</button>
                <button id="addNewProducts" style={{ display: 'none' }}>Add new products</button>
                <button id="deleteNoLongerStockedProducts" style={{ display: 'none' }}>Delete no longer stocked products</button>
                <button onClick={() => scriptFunctions.goBackToAuthentication()}>Back</button>
                    </div>*/}

            {/* Product Options - in progress
            <div id="productOptions" style={{ display: currentPage === 'productOptions' ? 'block' : 'none' }}>
                <p>Product Options:</p>
                <input type="text" id="productUsername" placeholder="Username" />
                <input type="password" id="productPassword" placeholder="Password" />
                <button onClick={handleProductVerification}>Verify</button>
                <button id="verifiedProductButton" style={{ display: 'none' }}>Verified</button>
                <button id="searchProductID" style={{ display: 'none' }}>Search Product ID</button>
                <button id="viewQuantity" style={{ display: 'none' }}>View Quantity</button>
                <button id="updatePrice" style={{ display: 'none' }}>Update Price</button>
                <button onClick={() => showPage('authentication')}>Back</button>
            </div>*/}


            {/* Remaining code for authentication... */}
            
            
        </div>
    );
};

export default InventoryManagementSystem;
