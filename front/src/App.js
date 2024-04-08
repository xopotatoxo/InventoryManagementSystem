import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route from react-router-dom
import './App.css';
import axios from 'axios';
import Location from './pages/addLocation';
import Manager from './pages/Manager';
import InventoryManagementSystem from './pages/temp'; // Import the InventoryManagementSystem component from temp.jsx
import AddBook from './pages/addBook';
import AddProduct from './pages/addProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/al' element={<addLocation />} /> {/* Use appropriate paths for Employee and Manager */}
      <Route path='/manager' element={<Manager />} />
      <Route path='/ims' element={<InventoryManagementSystem />} /> {/* Set the root path to use InventoryManagementSystem */}
      <Route path='/ab' element={<AddBook />} />
      <Route path='/ap' element={<AddProduct />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
