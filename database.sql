-- Create a new database
CREATE DATABASE your_database_name;

-- Use the newly created database
USE your_database_name;

-- Create a table
CREATE TABLE your_table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
    ...
);

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