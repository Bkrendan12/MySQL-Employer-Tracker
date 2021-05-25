DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT
)

CREATE TABLE roles (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL(10,4),
  department_id INT
);

CREATE TABLE departments (
  id INT PRIMARY KEY,
  name VARCHAR(30),
);
