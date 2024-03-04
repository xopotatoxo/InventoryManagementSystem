-- Create a new database
CREATE DATABASE INVENTORY;

-- Use the newly created database
USE INVENTORY;

-- Create a table
CREATE TABLE STOCKS (
    p_id int,
    s_name varchar(255));
    -- Create a table
CREATE TABLE MANAGERS (
    Managers_ID int,
    store varchar(255));
    -- Create a table
CREATE TABLE EMPLOYEE (
    Username_ID varchar(255),
    pw varchar(255),
    full_Name varchar(255),
    hired_by varchar(255),
    fired_by varchar(255));
    -- Create a table
CREATE TABLE UPDATES_QUANTITY (
	e_id varchar(255),
    Product_ID int);
    -- Create a table
CREATE TABLE MANUFACTURER (
    m_name varchar(255),
    supplies_by varchar(255),
    request_by varchar(255));
    -- Create a table
CREATE TABLE STORE (
    s_name varchar(255),
    location int);
    -- Create a table
CREATE TABLE LOCATION (
    Location_ID int,
    country varchar(255),
    province varchar(255),
    city varchar(255));
    -- Create a table
CREATE TABLE REQUEST (
    managers_id int,
    manu_id varchar(255));
    -- Create a table
CREATE TABLE PRODUCT (
    product_id int,
    price float,
    quantity int,
    Added_By varchar(255),
    removed_by varchar(255),
    supplier varchar(255));
    -- Create a table
CREATE TABLE BOOKS (
    p_id int,
    title varchar(255),
    author varchar(255),
    genre varchar(255));
    -- Create a table
CREATE TABLE CLOTHING (
    p_id int,
    size varchar(255),
    colour varchar(255),
    style varchar(255));
    -- Create a table
CREATE TABLE FOOD (
    p_id int,
    expiration varchar(255));
    -- Create a table
CREATE TABLE WORKS_AT (
    e_id varchar(255),
    s_name varchar(255));

-- Insert data into the table
INSERT INTO your_table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

-- Select data from the table
SELECT column1, column2, column3, ...
FROM your_table_name;

-- Update data in the table
UPDATE your_table_name
SET column1 = new_value1, column2 = new_value2, ...
WHERE condition;

-- Delete data from the table
DELETE FROM your_table_name
WHERE condition;