const inquirer = require('inquirer');
const db = require("./db");
require("console.table");

// call start up function

init();

// function: start up
//    optional: display logo text, load main prompts using asciiart-logo
//    call function to the main prompt for questions
function init(){
    mainQuestions();
}

function mainQuestions() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
        }
    ]).then(function(data) {
        switch (data.choice){
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'Add a department':
                addADepartment();
                break;
            case 'Add a role':
                addARole();
                break;
            case 'Add an employee':
                addAnEmployee();
                break;
            case 'Update an employee role':
                updateAnEmployeeRole();
                break;
            default:
                console.log('You have decided to quit');
                quit();
                break;
        }
    })
}

function viewAllEmployees() {
    db.findEmployees()
    .then(([employees]) => {
      console.table(employees);
    })
    .then(() => {
        mainQuestions();
    })
}

function viewAllRoles (){
    db.findRoles()
    .then(([roles]) => {
      console.table(roles);
    })
    .then(() => {
        mainQuestions();
    })
}

function viewAllDepartments(){
    db.findDepartment()
    .then(([departments]) => {
      console.table(departments)
    })
    .then(() => {
        mainQuestions();
    })
}

function addADepartment(){
    inquirer
    .prompt([
      {
        type: 'input',
        message: "What is the name of the department?",
        name: 'departmentName'
      }
    ])
    .then((data) => {
      let departmentName = data.departmentName;
      db.createDepartment(departmentName)
      console.log(`Added ${data.departmentName} to the database.`)
    })
    .then(() => {
        mainQuestions();
    })
}

function addARole(){
    db.findDepartment()
    .then(([departments]) => {
      const allDepartments = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));
      inquirer
        .prompt([
          {
            type: 'list',
            message: "What is the name of the department?",
            name: 'departmentName',
            choices: allDepartments
          },
          {
            type: 'input',
            message: "What is the new role called?",
            name: 'roleName',
          },
          {
            type: 'input',
            message: "What is the salary of this role?",
            name: 'salary'
          }
        ])
        .then((data) => {
          let newRole = {
            title: data.roleName,
            salary: data.salary,
            department_id: data.departmentName
          }
          db.createRoles(newRole);
          console.log(`Added ${data.roleName} to the database.`)
        })
        .then(() => {
            mainQuestions();
        })
    });
}

function addAnEmployee(){
    inquirer
    .prompt([
      {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'firstName',
      },
      {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'lastName',
      }
    ])
    .then((data) => {
      let firstName = data.firstName;
      let lastName = data.lastName;
      db.findRoles()
        .then(([roles]) => {
          const options = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }))
          inquirer.prompt([
            {
              type: 'list',
              message: 'Choose one of the following roles for the new employee.',
              choices: options,
              name: 'role'
            }
          ])
            .then((data) => {
              let role_id = data.role;

              db.findEmployees()
                .then(([employees]) => {
                  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }))
                  inquirer.prompt([
                    {
                      type: 'list',
                      message: "Choose the new employee's manager.",
                      choices: managerChoices,
                      name: 'manager'
                    }
                  ])
                    .then((data) => {
                      let newEmployee = {
                        first_name: firstName,
                        last_name: lastName,
                        role_id: role_id,
                        manager_id: data.manager
                      }
                      db.createEmployee(newEmployee);
                      console.log(`Added ${firstName} ${lastName} to the database.`)
                      mainQuestions();
                    })
                })
            })
        })
    })
}

function updateAnEmployeeRole(){
    db.findEmployees()
    .then(([employees]) => {
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }))
      inquirer.prompt([
        {
          type: 'list',
          message: "Choose an employee to update.",
          choices: employeeChoices,
          name: 'employee'
        }
      ])
        .then((data) => {
          let employee_id = data.employee;

          db.findRoles()
            .then(([roles]) => {
              const roleId = roles.map(({ id, title }) => ({
                name: title,
                value: id
              }))
              inquirer.prompt([
                {
                  type: 'list',
                  message: 'Choose one of the following roles.',
                  choices: roleId,
                  name: 'role'
                }
              ])
                .then((data) => {
                  let role_id = data.role;
                  db.updateEmployeeRole(role_id, employee_id);
                  console.log(`Employee role was updated in the database.`)
                  mainQuestions();
                });
            })
        })
    })
}

function quit(){
    process.exit();
}