export default {
    showStoreSelection() {
        document.getElementById('homepage').style.display = 'none';
        document.getElementById('storeSelection').style.display = 'block';
    },
    
    showLocationSelection() {
        document.getElementById('storeSelection').style.display = 'none';
        document.getElementById('locationSelection').style.display = 'block';
    },

    showAuthentication() {
        document.getElementById('locationSelection').style.display = 'none';
        document.getElementById('authentication').style.display = 'block';
    },

    showOptions() {
        var authType = document.querySelector('input[name="auth"]:checked').value;
        document.getElementById('authentication').style.display = 'none';
        if (authType === 'manager') {
            document.getElementById('managerOptions').style.display = 'block';
        } else if (authType === 'employee') {
            document.getElementById('employeeOptions').style.display = 'block';
        } else if (authType === 'product') {
            document.getElementById('productOptions').style.display = 'block';
        }
    },

    authenticateManager() {
        var username = document.getElementById('managerUsername').value;
        var password = document.getElementById('managerPassword').value;
        // Check if username and password are correct
        if (username === "123" && password === "123") {
            document.getElementById('verifiedManagerButton').style.display = 'block'; // Show the verified button
            document.getElementById('requestsProducts').style.display = 'block';
            document.getElementById('fireEmployees').style.display = 'block';
            document.getElementById('hireEmployees').style.display = 'block';
            document.getElementById('addNewProducts').style.display = 'block';
            document.getElementById('deleteNoLongerStockedProducts').style.display = 'block';
        }
    },

    authenticateEmployee() {
        var username = document.getElementById('employeeUsername').value;
        var password = document.getElementById('employeePassword').value;
        // Check if username and password are correct
        if (username === "123" && password === "123") {
            document.getElementById('verifiedEmployeeButton').style.display = 'block'; // Show the verified button
            document.getElementById('editEmployee').style.display = 'block';
            document.getElementById('updateProductQuantity').style.display = 'block';
        }
    },

    authenticateProduct() {
        var username = document.getElementById('productUsername').value;
        var password = document.getElementById('productPassword').value;
        // Check if username and password are correct
        if (username === "123" && password === "123") { // Change the condition accordingly
            document.getElementById('verifiedProductButton').style.display = 'block'; // Show the verified button
            document.getElementById('searchProductID').style.display = 'block';
            document.getElementById('viewQuantity').style.display = 'block';
            document.getElementById('updatePrice').style.display = 'block';
        }
    },

    goBackToHomepage() {
        document.getElementById('homepage').style.display = 'block';
        document.getElementById('storeSelection').style.display = 'none';
    },

    goBackToStoreSelection() {
        document.getElementById('storeSelection').style.display = 'block';
        document.getElementById('locationSelection').style.display = 'none';
    },

    goBackToLocationSelection() {
        document.getElementById('locationSelection').style.display = 'block';
        document.getElementById('authentication').style.display = 'none';
    },

    goBackToAuthentication() {
        document.getElementById('authentication').style.display = 'block';
        document.getElementById('managerOptions').style.display = 'none';
        document.getElementById('employeeOptions').style.display = 'none';
        document.getElementById('productOptions').style.display = 'none';
    }

};