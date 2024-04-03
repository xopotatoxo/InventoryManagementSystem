-- Create a new database
CREATE DATABASE IF NOT EXISTS INVENTORY;

-- Use the newly created database
USE INVENTORY;

CREATE TABLE LOCATION (
    Location_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
    Country VARCHAR(100) NOT NULL,
    Province VARCHAR(50) NOT NULL,
    City VARCHAR(100) NOT NULL
);

CREATE TABLE STORE (
    Name VARCHAR(255) NOT NULL PRIMARY KEY,
    Location INT NOT NULL,
    FOREIGN KEY (Location) REFERENCES LOCATION(Location_ID)
);

CREATE TABLE MANAGERS (
    managers_id INT AUTO_INCREMENT PRIMARY KEY,
    store VARCHAR(255) NOT NULL,
    FOREIGN KEY (store) REFERENCES STORE(Name)
);

CREATE TABLE EMPLOYEE (
    Username_id VARCHAR(50) NOT NULL PRIMARY KEY,
    Password VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Hired_by INT NOT NULL,
    Fired_by INT,
    FOREIGN KEY (Hired_by) REFERENCES MANAGERS(managers_id),
    FOREIGN KEY (Fired_by) REFERENCES MANAGERS(managers_id)
);

CREATE TABLE MANUFACTURER (
    Name VARCHAR(255) NOT NULL PRIMARY KEY,
    Supplies_by INT, 
    Request_by INT,
    FOREIGN KEY (Supplies_by) REFERENCES MANAGERS(managers_id),
    FOREIGN KEY (Request_by) REFERENCES MANAGERS(managers_id)
);

CREATE TABLE REQUEST (
    Manager_id INT NOT NULL PRIMARY KEY,
    Manu_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (Manager_id) REFERENCES MANAGERS(managers_id),
    FOREIGN KEY (Manu_name) REFERENCES MANUFACTURER(Name)
);

CREATE TABLE PRODUCT (
    Product_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Price FLOAT NOT NULL,
    Quantity INT NOT NULL,
    Added_By INT NOT NULL, 
    Removed_by INT, 
    Supplier VARCHAR(255),
    FOREIGN KEY (Added_by) REFERENCES MANAGERS(managers_id),
    FOREIGN KEY (Removed_by) REFERENCES MANAGERS(managers_id),
    FOREIGN KEY (Supplier) REFERENCES MANUFACTURER(Name)
);

CREATE TABLE BOOK (
    Product_id INT NOT NULL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Author VARCHAR(255) NOT NULL, 
    Genre VARCHAR(255) NOT NULL,
    FOREIGN KEY (Product_id) REFERENCES PRODUCT(Product_id)
);

CREATE TABLE FOOD (
    Product_id INT NOT NULL PRIMARY KEY,
    Expiration DATE NOT NULL,
    FOREIGN KEY (Product_id) REFERENCES PRODUCT(Product_id)
);

CREATE TABLE CLOTHING (
    Product_id INT NOT NULL PRIMARY KEY,
    Size VARCHAR(10) NOT NULL, 
    Colour VARCHAR(50) NOT NULL, 
    Style VARCHAR(50) NOT NULL,
    FOREIGN KEY (Product_id) REFERENCES PRODUCT(Product_id)
);

CREATE TABLE WORKS_AT (
    E_id VARCHAR(255) NOT NULL PRIMARY KEY,
    Store_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (E_id) REFERENCES EMPLOYEE(Username_id),
    FOREIGN KEY (Store_name) REFERENCES STORE(Name)
);

INSERT INTO LOCATION (Country, Province, City) VALUES ('Canada', 'Alberta', 'Calgary');
INSERT INTO STORE (Name, Location) VALUES ('Our Store', 1);
INSERT INTO MANAGERS (store) VALUES ('Our Store');
INSERT INTO EMPLOYEE (Username_id, Password, Name, Hired_by) VALUES ('pmadill', '1234', 'Philippa', 1);
INSERT INTO MANUFACTURER (Name, Supplies_by, Request_by) VALUES ('Supplier', 1, 1);
INSERT INTO REQUEST (Manager_id, Manu_name) VALUES (1, 'Supplier');
INSERT INTO PRODUCT (Price, Quantity, Added_by, Supplier) VALUES (3.99, 10, 1, 'Supplier');
INSERT INTO PRODUCT (Price, Quantity, Added_by, Supplier) VALUES (20, 15, 1, 'Supplier');
INSERT INTO PRODUCT (Price, Quantity, Added_by, Supplier) VALUES (34.99, 7, 1, 'Supplier');
INSERT INTO BOOK (Product_id, Title, Author, Genre) VALUES (1, 'Pride and Prejudice', 'Jane Austen', 'Classic');
INSERT INTO CLOTHING (Product_id, Size, Colour, Style) VALUES (3, 'M', 'Blue', 'Shirt');
INSERT INTO WORKS_AT (E_id, Store_name) VALUES ('pmadill', 'Our Store');
