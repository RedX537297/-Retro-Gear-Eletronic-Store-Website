--FILE TO CREATE THE DATABASE - DO NOT ALTER THE DATABASE STRUCTURE
-- Create the "store" database
CREATE DATABASE store;

-- Create the "devices" table
CREATE TABLE devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_name VARCHAR(255) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);