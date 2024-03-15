CREATE TABLE LOCATION(
Location_ID int auto_increment not null primary key, 
Country varchar(100) NOT NULL,
Province varchar(50) NOT NULL,
City varchar(100) NOT NULL
);

CREATE TABLE STORE(
Name varchar(255) NOT NULL PRIMARY KEY,
Location int NOT NULL,
FOREIGN KEY (Location) REFERENCES LOCATION(Location_ID)
);

CREATE TABLE MANAGERS(
managers_id int AUTO_INCREMENT PRIMARY KEY,
store varchar(255) NOT NULL,
FOREIGN KEY (store) REFERENCES STORE(Name)
);

CREATE TABLE EMPLOYEE(
Username_id varchar(50) NOT NULL PRIMARY KEY,
Password varchar(255) NOT NULL,
Name varchar(255) NOT NULL,
Hired_by int NOT NULL,
Fired_by int,
FOREIGN KEY (Hired_by) REFERENCES MANAGERS(managers_id),
FOREIGN KEY (Fired_by) REFERENCES MANAGERS(managers_id)
);

CREATE TABLE MANUFACTURER(
Name varchar(255) NOT NULL PRIMARY KEY,
Supplies_by int, 
Request_by int,
foreign key (Supplies_by) REFERENCES MANAGERS(managers_id),
FOREIGN KEY (Request_by) REFERENCES MANAGERS(managers_id)
);


CREATE TABLE REQUEST(
Manager_id int not null primary key,
Manu_name varchar(255) not null,
FOREIGN KEY (Manager_id) REFERENCES MANAGERS(managers_id),
FOREIGN KEY (Manu_name) REFERENCES MANUFACTURER(Name)
);

CREATE TABLE PRODUCT(
Product_id int auto_increment not null primary key,
Price float not null,
Quantity int not null,
Added_By int not null, 
Removed_by int, 
Supplier varchar(255),
FOREIGN KEY (Supplier) REFERENCES MANUFACTURER(Name)
);

CREATE TABLE BOOK(
Product_id int not null primary key,
Title varchar(255) not null,
Author varchar(255) not null, 
Genre varchar(255) not null,
FOREIGN KEY (Product_id) REFERENCES PRODUCT(Product_id)
);

CREATE TABLE FOOD(
Product_id int not null primary key,
Expiration date not null,
FOREIGN KEY (Product_id) REFERENCES PRODUCT(Product_id)
);

CREATE TABLE CLOTHING(
Product_id int not null primary key,
Size varchar(10) not null, 
Colour varchar (50) not null, 
Style varchar(50) not null,
FOREIGN KEY (Product_id) REFERENCES PRODUCT(Product_id)
);

CREATE TABLE WORKS_AT(
E_id varchar(255) not null primary key,
Store_name varchar(255) not null,
FOREIGN KEY (E_id) REFERENCES EMPLOYEE(Username_id),
FOREIGN KEY (Store_name) REFERENCES STORE(Name)
);

SHOW TABLES;