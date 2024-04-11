import express from 'express';
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = 8800;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'INVENTORY'
});

app.use(express.json())
app.use(cors())


app.get("/", (req, res)=>{
  res.json("Hello this is backend");
});


app.get("/LOCATION", (req, res) => {
  const q = "SELECT * FROM LOCATION";
  db.query(q, function(err, data) {
    if (err){
      console.error("Error executing SQL query:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/STORE", (req, res) => {
  db.query("SELECT * FROM STORE", function(err, data) {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

app.get("/MANAGERS", (req, res) => {
  db.query("SELECT * FROM MANAGERS", function(err, data) {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

app.get("/EMPLOYEE", (req, res) => {
  db.query("SELECT * FROM EMPLOYEE", function(err, data) {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

app.get("/MANUFACTURER", (req, res) => {
  db.query("SELECT * FROM MANUFACTURER", function(err, data) {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

app.get("/REQUEST", (req, res) => {
  db.query("SELECT * FROM REQUEST", function(err, data) {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});


// GET Product by ID
// GET a single product by ID
// GET a single product by ID
app.get("/PRODUCT/:id", (req, res) => {
  const productId = req.params.id;
  const q = "SELECT * FROM PRODUCT WHERE Product_id = ?";
  db.query(q, [productId], (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

// GET all products
app.get("/PRODUCT", (req, res) => {
  const q = "SELECT * FROM PRODUCT";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});



app.get("/BOOK", (req, res) => {
  db.query("SELECT * FROM BOOK", function(err, data) {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

app.get("/FOOD", (req, res) => {
  db.query("SELECT * FROM FOOD", function(err, data) {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

app.get("/CLOTHING", (req, res) => {
  db.query("SELECT * FROM CLOTHING", function(err, data) {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

app.get("/WORKS_AT", (req, res) => {
  db.query("SELECT * FROM WORKS_AT", function(err, data) {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

//POST
app.post("/LOCATION", (req, res)=>{
  const { Country, Province, City } = req.body; // Extract values from request body
  const q = `INSERT INTO LOCATION (\`Country\`, \`Province\`, \`City\`) VALUES ('${Country}', '${Province}', '${City}')`;

  db.query(q, (err, data)=>{
    if (err){
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

// POST Create Store
app.post("/STORE", (req, res) => {
  const { Name, Location } = req.body; // Extract values from request body
  const q = `INSERT INTO STORE (Name, Location) VALUES ('${Name}', '${Location}')`;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

// POST Create Manager (assuming manager is created when store is created)
app.post("/MANAGERS", (req, res) => {
  const { store } = req.body; // Extract values from request body
  const q = `INSERT INTO MANAGERS (store) VALUES ('${store}')`;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

// POST Create Employee
app.post("/EMPLOYEE", (req, res) => {
  const { Username_id, Password, Name, Hired_by, Fired_by } = req.body; // Extract values from request body
  const q = `INSERT INTO EMPLOYEE (Username_id, Password, Name, Hired_by) VALUES ('${Username_id}', '${Password}', '${Name}', '${Hired_by}')`;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});


// POST Create Manufacturer
app.post("/MANUFACTURER", (req, res) => {
  const { Name, Supplies_by, Request_by } = req.body; // Extract values from request body
  const q = `INSERT INTO MANUFACTURER (Name, Supplies_by, Request_by) VALUES ('${Name}', '${Supplies_by}', '${Request_by}')`;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

// POST Create Request
app.post("/REQUEST", (req, res) => {
  const { Manager_id, Manu_name } = req.body; // Extract values from request body
  const q = `INSERT INTO REQUEST (Manager_id, Manu_name) VALUES ('${Manager_id}', '${Manu_name}')`;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

// POST Create Product
app.post("/PRODUCT", (req, res) => {
  const { Price, Quantity, Added_by, Removed_by, Supplier } = req.body; // Extract values from request body
  const q = `INSERT INTO PRODUCT (Price, Quantity, Added_by, Supplier) VALUES ('${Price}', '${Quantity}', '${Added_by}', '${Supplier}')`;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

// POST Create Book
app.post("/BOOK", (req, res) => {
  const { product_id, title, author, genre } = req.body; // Extract values from request body
  const q = 'INSERT INTO BOOK (Product_id, Title, Author, Genre) VALUES (?, ?, ?, ?)';
  const values = [product_id, title, author, genre];

  db.query(q, values, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    // Optionally, you might return the newly created book's ID or some other information
    return res.json({ message: 'Book added successfully', bookId: results.insertId });
  });
});


// POST Create Food
app.post("/FOOD", (req, res) => {
  const { Product_id, Expiration } = req.body; // Extract values from request body
  const q = `INSERT INTO FOOD (Product_id, Expiration) VALUES ('${Product_id}', '${Expiration}')`;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

// POST Create Clothing
app.post("/CLOTHING", (req, res) => {
  const { Product_id, Size, Colour, Style } = req.body; // Extract values from request body
  const q = `INSERT INTO CLOTHING (Product_id, Size, Colour, Style) VALUES ('${Product_id}', '${Size}', '${Colour}', '${Style}')`;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});

// POST Create Works_At
app.post("/WORKS_AT", (req, res) => {
  const { E_id, Store_name } = req.body; // Extract values from request body
  const q = `INSERT INTO WORKS_AT (E_id, Store_name) VALUES ('${E_id}', '${Store_name}')`;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
  });
});


app.delete("/BOOK/:id", (req, res) => {
  console.log("DELETE request received for product ID:", req.params.id); // Log the incoming product ID
  const productId = req.params.id;
  const q = "DELETE FROM BOOK WHERE Product_id=?";

  db.query(q, [productId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json("Successfully deleted the product");
  });
});


app.delete("/FOOD/:id", (req, res)=>{
  console.log("DELETE request received for product ID:", req.params.id); // Log the incoming product ID
  const productId = req.params.id;
  const q = "DELETE FROM FOOD WHERE Product_id=?";

  db.query(q, [productId], (err, results) =>{

    if(err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json("Successfully deleted the product");
  });
});

app.delete("/CLOTHING/:id", (req, res)=>{
  console.log("DELETE request received for clothing ID:", req.params.id); // Log the incoming clothing ID
  const clothingId = req.params.id;
  const q = "DELETE FROM CLOTHING WHERE Product_id=?"; // Corrected query to delete from the CLOTHING table

  db.query(q, [clothingId], (err, results) =>{

    if(err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json("Successfully deleted the clothing");
  });
});



app.delete("/PRODUCT/:id", (req, res)=>{
  console.log("DELETE request received for product ID:", req.params.id); // Log the incoming product ID
  const productId = req.params.id;
  const q = "DELETE FROM  PRODUCT WHERE Product_id=?";

  db.query(q, [productId], (err, results) =>{

    if(err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json("Successfully deleted the product");
  });
});


app.delete("/EMPLOYEE/:id", (req, res) => {
  console.log("DELETE request received for employee ID:", req.params.id); // Log the incoming employee ID
  const employeeId = req.params.id;
  const q = "DELETE FROM EMPLOYEE WHERE Username_id=?";

  db.query(q, [employeeId], (err, results) => {
      if (err) {
          console.error("Error executing SQL query:", err);
          return res.status(500).json({ error: 'Error executing SQL query' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Employee not found' });
      }
      return res.json({ message: "Successfully deleted the employee" });
  });
});

// Update Employee
app.patch("/EMPLOYEE/:id", (req, res) => {
  const employeeId = req.params.id;
  const { Name, Password } = req.body;

  const q = "UPDATE EMPLOYEE SET Name=?, Password=? WHERE Username_id=?";

  db.query(q, [Name, Password, employeeId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    return res.json({ message: "Successfully updated the employee" });
  });
});

// Update Product
app.patch("/PRODUCT/:id", (req, res) => {
  const productId = req.params.id;
  const { Price, Quantity } = req.body;

  const q = "UPDATE PRODUCT SET Price=?, Quantity=? WHERE Product_id=?";

  db.query(q, [Price, Quantity, productId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json({ message: "Successfully updated the product" });
  });
});



app.listen(port, () => {
  console.log(`Connected to backend`);
});
