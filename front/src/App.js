import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route from react-router-dom
import './App.css';
import axios from 'axios';
import Location from './pages/addLocation';
import InventoryManagementSystem from './pages/temp'; // Import the InventoryManagementSystem component from temp.jsx
import AddBook from './pages/addBook';
import AddProduct from './pages/addProduct';
import SelectProduct from './pages/selectProduct';
import AddFood from './pages/addFood';
import AddClothing from './pages/addClothing';
import AddEmployee from './pages/hireEmployee';
import DeleteProduct from './pages/deleteProduct';
import DeleteEmployee from './pages/fireEmployee';
import UpdateEmployee from './pages/updateEmployee';
import UpdateProduct from './pages/updateProduct';
import ProductDetails from  './pages/searchProduct';
import AddRequest from './pages/addRequest';
import Manager from './pages/manager';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/al' element={<addLocation />} /> {/* Use appropriate paths for Employee and Manager */}
      <Route path='/ims' element={<InventoryManagementSystem />} /> {/* Set the root path to use InventoryManagementSystem */}
      <Route path='/ab' element={<AddBook />} />
      <Route path='/ap' element={<AddProduct />} />
      <Route path='/sp' element={<SelectProduct />} />
      <Route path="/af" element={<AddFood/>} />
      <Route path='/ac' element={<AddClothing />} />
      <Route path='/ae' element={<AddEmployee />} />
      <Route path='/dp' element={<DeleteProduct />} />
      <Route path='/de' element={<DeleteEmployee />} />
      <Route path='/ue' element={<UpdateEmployee />} />
      <Route path='/up' element={<UpdateProduct />} />
      <Route path='/sa' element={<ProductDetails />} />
      <Route path='/ar' element={<AddRequest />} />
      <Route path='/mg' element={<Manager />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
