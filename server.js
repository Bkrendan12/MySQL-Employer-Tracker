const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const { promisify } = require("util");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "Edleman11!",
  database: "employeeTracker_Db",
});
