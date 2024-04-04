import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route from react-router-dom
import './App.css';
import axios from 'axios';
import Location from './pages/Location';
import Manager from './pages/Manager';
import InventoryManagementSystem from './pages/temp'; // Import the InventoryManagementSystem component from temp.jsx

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/location' element={<Location />} /> {/* Use appropriate paths for Employee and Manager */}
      <Route path='/manager' element={<Manager />} />
      <Route path='/ims' element={<InventoryManagementSystem />} /> {/* Set the root path to use InventoryManagementSystem */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
