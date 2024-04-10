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
  console.log("Request received for /LOCATION route");
  const q = "SELECT * FROM LOCATION";
  db.query(q, function(err, data) {
    if (err){
      console.error("Error executing SQL query:", err);
      return res.json(err);
    }
    console.log("Query results:", data);
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

app.get("/PRODUCT", (req, res) => {
  db.query("SELECT * FROM PRODUCT", function(err, data) {
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
  const q = `INSERT INTO EMPLOYEE (Username_id, Password, Name, Hired_by, Fired_by) VALUES ('${Username_id}', '${Password}', '${Name}', '${Hired_by}', '${Fired_by}')`;

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
  const { Product_id, Title, Author, Genre } = req.body; // Extract values from request body
  const q = `INSERT INTO BOOK (Product_id, Title, Author, Genre) VALUES ('${Product_id}', '${Title}', '${Author}', '${Genre}')`;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: 'Error executing SQL query' });
    }
    return res.json(data);
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


app.listen(port, () => {
  console.log(`Connected to backend`);
});
