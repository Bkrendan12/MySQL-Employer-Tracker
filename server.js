const mysql = require("mysql");
const inquirer = require("inquirer");
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
      "View all departments",
      "View all roles",
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
    message: "what is the employee's role_id?",
    name: "role_id",
    choices: async () => {
      let res = await query(`SELECT * FROM roles`);
      res = res.map((row) => {
        return {
          name: row.title,
          value: row.id,
        };
      });
      return res;
    },
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
    type: "list",
    message: "What is the department id?",
    name: "departmentId",
    choices: async () => {
      let res = await query(`SELECT * FROM departments`);
      res = res.map((row) => {
        return {
          name: row.department_name,
          value: row.id,
        };
      });
      return res;
    },
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
    message: "Who is the employee?",
    name: "employee",
    choices: async () => {
      let res = await query(`SELECT * FROM employees`);

      res = res.map((row) => {
        return {
          name: `${row.first_name} ${row.last_name}`,
          value: row.id,
        };
      });
      return res;
    },
  },
  {
    type: "list",
    message: "What is the role?",
    name: "role",
    choices: async () => {
      let res = await query(`SELECT * FROM roles`);
      res = res.map((row) => {
        return {
          name: row.title,
          value: row.id,
        };
      });
      return res;
    },
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
    case "Add employee":
      await addEmployee();
      break;
    case "Add role":
      await addRole();
      break;
    case "Add department":
      await addDepartment();
      break;
    case "Update employee role":
      updateEmployeeRole();
      break;
  }
}

const query = promisify(connection.query.bind(connection));

// View All Employees

async function viewAllEmployees() {
  let res = await query("SELECT * FROM employees");
  console.log(consoleTable.getTable(res));
  run();
}

// View All Departments

async function viewAllDepartments() {
  let res = await query("SELECT * FROM departments");
  console.log(consoleTable.getTable(res));
  run();
}

// View All Roles

async function viewAllRoles() {
  let res = await query("SELECT * FROM roles");
  console.log(consoleTable.getTable(res));
  run();
}

// Add Employee

async function addEmployee() {
  // let roles = await employee_db.viewAllRoles();
  let { firstName, lastName, role_id } = await inquirer.prompt(
    employeeBuilderQuestions
  );
  let res = await query(
    `INSERT INTO employees (first_name, last_name, role_id) VALUES ('${firstName}', '${lastName}', ${role_id})`
  );
  viewAllEmployees();
}

async function addDepartment() {
  let { title } = await inquirer.prompt(departmentBuilderQuestions);
  try {
    let res = await query(
      `INSERT INTO departments (department_name) VALUES ('${title}')`
    );
    viewAllDepartments();
  } catch (err) {
    console.error(err);
  }
}

// Add Role

async function addRole() {
  let { title, salary, departmentId } = await inquirer.prompt(
    roleBuilderQuestions
  );
  let res = await query(
    `INSERT INTO roles (title, salary, department_id) VALUES ('${title}', ${salary}, ${departmentId} )`
  );
  viewAllRoles();
}

// Update Employee Role

async function updateEmployeeRole() {
  let { employee, role } = await inquirer.prompt(updateEmployeeRoleQuestions);

  let res = await query(
    `UPDATE employees SET role_id = ${role} WHERE id = ${employee}`
  );
  viewAllEmployees();
}

run();
