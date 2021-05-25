const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Edleman11!",
  database: "employee_db",
});

const actionQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: [
      "View all employees",
      "View all departments.",
      "View all roles.",
      "Add employee",
      "Add role",
      "Add department",
      "Update employee role",
    ],
  },
];

const employeeBuilderQuestions = [
  {
    type: "input",
    message: "what is the employee's first name?",
    name: "firstName",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "lastName",
  },
  {
    type: "list",
    message: "what is the employee's role?",
    name: "role",
    choices: [],
  },
];

const roleBuilderQuestions = [
  {
    type: "input",
    message: "What is the title?",
    name: "title",
  },
  {
    type: "input",
    message: "What is the salary?",
    name: "salary",
  },
  {
    type: "input",
    message: "What is the department?",
    name: "department",
  },
];

const departmentBuilderQuestions = [
  {
    type: "input",
    message: "What is the title?",
    name: "title",
  },
];

const updateEmployeeRoleQuestions = [
  {
    type: "list",
    message: "what is the employee?",
    name: "employee",
    choices: [],
  },
  {
    type: "list",
    message: "What is the role?",
    name: "role",
    choices: [],
  },
];

const updateEmployeeManagerQuestions = [
  {
    type: "list",
    message: "what is the employee?",
    name: "employee",
    choices: [],
  },
  {
    type: "list",
    message: "What is the role?",
    name: "role",
    choices: [],
  },
];

connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});

async function run() {
  let { action } = await inquirer.prompt(actionQuestions);
  console.log(action);

  switch (action) {
    case "View all employees":
      await viewAllEmployees();
      break;
    case "View all departments":
      await viewAllDepartments();
      break;
    case "View all roles":
      await viewAllRoles();
      break;
    case "add Employee":
      await addEmployee();
      break;
    case "add role":
      await addRole();
      break;
    case "add department":
      await addDepartment();
      break;
    case "Update employee role":
      updateEmployeeRole();
      break;
  }
}

const query = promisify(connection.query.bind(connection));

async function viewAllEmployees() {
  let res = await query("SELECT * FROM employees");
  console.log(consoleTable.getTable(res));
}

async function viewAllDepartments() {
  let res = await query("SELECT * FROM departments");
  console.log(consoleTable.getTable(res));
}

async function viewAllRoles() {
  let res = await query("SELECT * FROM employees");
  console.log(consoleTable.getTable(res));
}

async function addEmployee() {
  let { firstName, lastName, role } = await inquirer.prompt(
    employeeBuilderQuestions
  );
  let res = await query(
    `INSERT INTO (first_name, last_name, role_id) VALUES (${firstName} ${lastName} ${role} )`
  );
}

async function addRole() {
  let { title, salary, departmentId } = await inquirer.prompt(
    roleBuilderQuestions
  );
  let res = await query(
    `INSERT INTO (title, salary, department_id) VALUES (${title} ${salary} ${departmentId} )`
  );
}

async function addDepartment() {
  let { title } = await inquirer.prompt(departmentBuilderQuestions);
  let res = await query(`INSERT INTO (title) VALUES (${title})`);
}

async function updateEmployeeRole() {
  let { title, salary, departmentId } = await inquirer.prompt(
    updateEmployeeRoleQuestions
  );
  let res = await query(
    `INSERT INTO (title, salary, department_id) VALUES (${title} ${salary} ${departmentId})`
  );
}

run();
