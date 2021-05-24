DROP DATABASE IF EXISTS employeeTracker_Db;

CREATE DATABASE employeeTracker_Db;

USE employeeTracker_Db;

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT
)

CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL(10,4),
  department_id INT
);

CREATE TABLE departments (
  id INT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

SELECT * FROM departments;
SELECT * FROM role;
SELECT * FROM employees;



