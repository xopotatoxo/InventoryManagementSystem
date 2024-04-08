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
        let nextPage = 'locationSelection';
        if (type === 'employee') {
            console.log('Employee authentication'); // Debugging statement
            try {
                await scriptFunctions.authenticateEmployee();
                nextPage = 'employeeSuccess';
                verifiedEmployeeButtonRef.current.style.display = 'block'; // Set display to 'block'
            } catch (error) {
                console.error('Error authenticating employee:', error);
            }
        } else if (type === 'manager') {
            console.log('Manager authentication');
            await scriptFunctions.authenticateManager();
            nextPage = 'managerSuccess'; // Change to 'managerSuccess'
            verifiedManagerButtonRef.current.style.display = 'block'; // Set display to 'block'
        } else if (type === 'store') {
            console.log('Store authentication');
            await scriptFunctions.authenticateStore();
            nextPage = 'storeOptions';
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
            </div>

            <div id="managerSuccess" style={{ display: currentPage === 'managerSuccess' ? 'block' : 'none' }}>
                <h2 id="verifiedManagerButton" ref={verifiedManagerButtonRef}>Verified</h2>
                <button id="displayEmployees" onClick={() => showPage('viewEmployees')}>View All Employees</button>
                <button id="fireEmployees" onClick={() => showPage('fireEmployee')}>Fire Employees</button>
                <button id="hireEmployees" onClick={() => showPage('hireEmployee')}>Hire Employees</button>
                <button id="viewAllProducts" onClick={() => showPage('viewProducts')}>View All Products</button>
                <button id="viewBooks" onClick={() => showPage('viewBooks')}>View Books</button>
                <button id="viewFood" onClick={() => showPage('viewFood')}>View Food</button>
                <button id="viewClothing" onClick={() => showPage('viewClothing')}>View Clothing</button>
                <button id="requestProducts" onClick={() => showPage('requestProduct')}>Request Products</button>
                <button><Link to="/ap">'Add New Product'</Link></button>
               {/* <button id="addNewProducts" onClick={() => showPage('addNewProducts')}>Add new products</button>*/}
                <button id="deleteNoLongerStockedProducts" onClick={() => showPage('deleteProducts')}>Delete no longer stocked products</button>
                <button onClick={() => showPage('authentication')}>Log out</button>
            </div>

            <div id="viewEmployees" style={{ display: currentPage === 'viewEmployees' ? 'block' : 'none' }}>
                <h2>All Employees:</h2>
                {/*display everything in WORKS_AT where WORKS_AT.store_name == MANAGERS.store AND MANAGERS.managers_id == the entered id when logged in
                so all the employees that work at the store they manage
                If that's too complicated just show all employees joined with the WORKS_AT table*/}
                <button onClick={()=> showPage('managerSuccesss')}>back</button>
            </div>

            <div id="fireEmployee" style={{ display: currentPage === 'fireEmployee' ? 'block' : 'none' }}>
                <h2>Fire Employee:</h2>
                <p>Please enter the username of the employee you wish to fire.</p>
                <input id="employeeName" placeholder="Employee username"/>
                {/*on click should remove employee from employee table*/}
                <button onClick={()=> showPage('managerSuccess')}>Fire Employee</button>
                <button onClick={()=> showPage('managerSuccess')}>back</button>
            </div>

            <div id= "hireEmployee" style={{display: currentPage === 'hireEmployee' ? 'block' : 'none'}}>
                <h2>Hire Employee:</h2>
                <p>Please enter the username of the employee you wish to hire.</p>
                <input id="employeeUsername" placeholder="Employee username"/>
                <p>Please enter the password for the employee you wish to hire.</p>
                <input id="employeePassword" placeholder="Employee password"/>
                <p>Please enter the full name of the employee you wish to hire</p>
                <input id="employeeName" placeholder="Employee name"/>
                {/* the manager's name should already be available as they're logged in. It should be passed into the hired_by field of EMPLOYEE
                On click should insert a new employee*/}
                <button onClick={()=> showPage('managerSuccess')}>Hire Employee</button>
                <button onClick={()=> showPage('managerSuccess')}>back</button>
            </div>

            <div id="viewProducts" style={{ display: currentPage === 'viewProducts' ? 'block' : 'none' }}> 
                <h2>All Products:</h2>
                {/*display everything in the product table*/}
                <button onClick={()=> showPage('managerSuccess')}>back</button>
            </div>

            <div id="viewBooks" style={{ display: currentPage === 'viewBooks' ? 'block' : 'none' }}>
                <h2>All Books:</h2>
                {/*display everything in the book table*/}
                <button onClick={()=> showPage('managerSuccess')}>back</button>
            </div>

            <div id="viewFood" style={{ display: currentPage === 'viewFood' ? 'block' : 'none' }}> 
                <h2>All Food:</h2>
                {/*display everything in the food table*/}
                <button onClick={()=> showPage('managerSuccess')}>back</button>
            </div>
            
            <div id="viewClothing" style={{ display: currentPage === 'viewClothing' ? 'block' : 'none' }}> 
                <h2>All Clothing:</h2>
                {/*display everything in the clothing table*/}
                <button onClick={()=> showPage('managerSuccess')}>back</button>
            </div>

            <div id="requestProduct" style={{ display: currentPage === 'requestProduct' ? 'block' : 'none' }}>
                
                <h2>Request Product:</h2>
                <p>Please enter the name of the manufacturer from whom you are requesting a product.</p>
                <input id="manuName" placeholder="Manufacturer name"/>
                <button onClick={()=> showPage('managerOptions')}>Make request</button>
                <button onClick={()=> showPage('managerSuccess')}>back</button>
            </div>

            <div id="addNewProducts" style={{display: currentPage === 'addNewProducts' ? 'block' : 'none'}}>
                <h2>Add New Products:</h2>
                <p>Please enter the price of the product you wish to add.</p>
                <input id="productPrice" placeholder="Product Price"/>
                <p>Please enter the quantity of the product you wish to add.</p>
                <input id="productQuantity" placeholder="Product Quantity"/>
                <button id="addProduct" onClick={()=> showPage('productType')}>Add Product</button>
                <button onClick={()=> showPage('managerSuccess')}>back</button>
                </div>

                <div id= "productType" style= {{display: currentPage === "productType" ? 'block' : 'none'}}>
                <p>Please select the type of the product you wish to add.</p>
                <p>The Product id is _____</p> {/*this should be the last product id. replace the 
                ____ with the appropriate number*/}
                <button><Link to="/ab">'book'</Link></button>
                {/*<button onClick={()=> showPage('book')}>Book</button>*/}
                <button onClick={()=> showPage('food')}>Food</button>
                <button onClick={()=> showPage('clothing')}>Clothing</button>
                <p></p>
                <button onClick={()=> showPage('managerSuccess')}>back</button>
            </div>

            <div id="book" style={{display: currentPage === 'book' ? 'block' : 'none'}}> 
                <h2>Add New Book:</h2>
                <p>Please enter product id of the book you wish to add.</p>
                <input id="bookID" placeholder="Product ID"/>
                <p>Please enter the title of the book you wish to add.</p>
                <input id="bookTitle" placeholder="Book Title"/>
                <p>Please enter the author of the book you wish to add.</p>
                <input id="bookAuthor" placeholder="Book Author"/>
                <p>Please enter the genre of the book you wish to add.</p>
                <input id="bookGenre" placeholder="Book Genre"/>
                <p> </p>
                <button onClick={()=> showPage('managerOptions')}>Add Book</button>
                <button onClick={()=> showPage('managerSuccess')}>back</button>
            </div>
            <div id="food" style={{display: currentPage === 'food' ? 'block' : 'none'}}>
                <h2>Add New Food:</h2>
                <p>Please enter product id of the food you wish to add.</p>
                <input id="foodID" placeholder="Product ID"/>
                <p>Please enter the expiration date of the food you wish to add.</p>
                <input id="foodExpDate" placeholder="Food Expiration Date"/>
                <button onClick={()=> showPage('managerOptions')}>Add Food</button>
                <button onClick={()=> showPage('managerSuccess')}>back</button>
            </div>
            <div id="clothing" style={{display: currentPage === 'clothing' ? 'block' : 'none'}}> 
                <h2>Add New Clothing:</h2>
                <p>Please enter product id of the clothing you wish to add.</p>
                <input id="clothingID" placeholder="Product ID"/>
                <p>Please enter the size of the clothing you wish to add.</p>
                <input id="clothingSize" placeholder="Clothing Size"/>
                <p>Please enter the colour of the clothing you wish to add.</p>
                <input id="clothingColour" placeholder="Clothing Colour"/>
                <p>Please enter the style of the clothing you wish to add.</p>
                <input id="clothingStyle" placeholder="Clothing Style"/>
                <button onClick={()=> showPage('managerOptions')}>Add Clothing</button>
                <button onClick={()=> showPage('managerSuccess')}>back</button>
            </div>
            <div id="deleteProducts" style={{display: currentPage === 'deleteProducts' ? 'block' : 'none'}}>
                <h2>Delete No Longer Stocked Products:</h2>
                <p>Please enter the id of the product you wish to remove from the inventory.</p>
                <input id="productID" placeholder="Product ID"/>
                <button onClick={()=> showPage('managerOptions')}>Delete Product</button>
                <button onClick={()=> showPage('managerSuccess')}>back</button>
            </div>

            <div id="employeeOptions" style={{ display: currentPage === 'employeeOptions' ? 'block' : 'none' }}>
                <p>Employee Options:</p>
                <input type="text" id="employeeUsername" placeholder="Username" />
                <input type="password" id="employeePassword" placeholder="Password" />
                <button onClick={() => handleAuthentication('employee')}>Verify</button>
            </div>


            <div id="employeeSuccess" style={{ display: currentPage === 'employeeSuccess' ? 'block' : 'none' }}>
                <h2 id="verifiedEmployeeButton" ref={verifiedManagerButtonRef}>Verified</h2>
                <button id="editEmployeeButton" onClick={() => showPage('editEmployee')}>Edit Employee</button>
                <button id="updateProductQuantityButton" onClick={() => showPage('updateProductQuantity')}>Update Product Quantity</button>
                <button onClick={() => showPage('authentication')}>Log out</button>
            </div>

            <div id="editEmployee" style={{ display: currentPage === 'editEmployee' ? 'block' : 'none' }}>
                <h2>Edit Employee:</h2>
                <p>Change password</p>
                <input id="newPassword" placeholder="New Password"/>
                <button onClick={() => showPage('employeeOptions')}>Change Password</button>
                <p>Change name</p>
                <input id="newName" placeholder="New Name"/>
                <button onClick={() => showPage('employeeSuccess')}>Change Name</button>
                <button onClick={() => showPage('employeeSuccess')}>back</button>
            </div>

            <div id="updateProductQuantity" style={{ display: currentPage === 'updateProductQuantity' ? 'block' : 'none' }}>
                <h2>Update Product Quantity:</h2>
                <p>Please enter the id of the product you wish to update.</p>
                <input id="productIDToUpdate" placeholder="Product ID"/>
                <p>Please enter the new quantity of the product.</p>
                <input id="newProductQuantity" placeholder="Product Quantity"/>
                <button onClick={() => showPage('employeeOptions')}>Update Product</button>
                <button onClick={() => showPage('employeeSuccess')}>back</button>
            </div>

            <div id="productOptions" style={{ display: currentPage === 'productOptions' ? 'block' : 'none' }}>
                <p>Store Options:</p>
                <input type="text" id="productUsername" placeholder="Username"/>
                <input type="password" id="productPassword" placeholder="Password"/>
                <button onClick={scriptFunctions.authenticateProduct}>Verify</button>
                <h2 id="verifiedProductButton" style={{ display: 'none' }}>Verified</h2>
                <button id="searchProductID" style={{ display: 'none' }} onClick={() => showPage('searchProductID')}>Search Product ID</button>
                <button id="viewQuantity" style={{ display: 'none' }} onClick={() => showPage('viewQuantity')}>View Quantity</button>
                <button id="updatePrice" style={{ display: 'none' }} onClick={() => showPage('updatePrice')}>Update Price</button>
                <button onClick={() => showPage('authentication')}>Log out</button>
            </div>

            <div id="searchProductID" style={{ display: currentPage === 'searchProductID' ? 'block' : 'none' }}>
                <h2>Search Product by ID:</h2>
                <p>Please enter the id of the product you wish to search for.</p>
                <input id="productID" placeholder="Product ID"/>
                <button onClick={() => showPage('productOptions')}>Search</button>
                <button onClick={() => showPage('productOptions')}>back</button>
            </div>

            <div id="viewQuantity" style={{ display: currentPage === 'viewQuantity' ? 'block' : 'none' }}>
                <h2>View Quantity:</h2>
                <p>Please enter the id of the product you wish to view the quantity of.</p>
                <input id="productID" placeholder="Product ID"/>
                <button onClick={() => showPage('productOptions')}>View Quantity</button>
                <button onClick={() => showPage('productOptions')}>back</button>
            </div>

            <div id="updatePrice" style={{ display: currentPage === 'updatePrice' ? 'block' : 'none' }}>
                <h2>Update Price:</h2>
                <p>Please enter the id of the product you wish to update the price of.</p>
                <input id="productID" placeholder="Product ID"/>
                <p>Please enter the new price of the product.</p>
                <input id="productPrice" placeholder="Product Price"/>
                <button onClick={() => showPage('productOptions')}>Update Price</button>
                <button onClick={() => showPage('productOptions')}>back</button>
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