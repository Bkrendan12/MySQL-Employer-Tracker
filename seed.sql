USE employee_db;

INSERT INTO employees (id, first_name, last_name, role_id)
VALUES 
(1, "John", "Doe", 1), 
(2, "Joe", "Rop", 2), 
(3, "Blarf", "Ranlp", 3), 
(4, "Jort", "Plawn", 4), 
(5, "Wort", "Plorry", 5); 


INSERT INTO roles (id, title, salary, department_id)
VALUES 
(1, "CEO", 120000, 1), 
(2, "Product Manager", 90000, 1), 
(3, "Senior Engineer", 80000, 2),
(4, "Junior Engineer", 70000, 2),
(5, "Sales Lead", 75000, 3);


INSERT INTO departments (id, department_name)
VALUES 
(1, "Management"), 
(2, "Engineering"), 
(3, "Sales"), 
(4, "Marketing"),
(5, "Q&A");
