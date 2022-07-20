const inquirer = require('inquirer');
const db = require("./db");
require("console.table");

// call start up function


// function: start up
//    optional: display logo text, load main prompts using asciiart-logo
//    call function to the main prompt for questions


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
    
    
    mainQuestions();
}

function viewAllRoles (){

}

function viewAllDepartments(){

}

function addADepartment(){

}

function addARole(){

}

function addAnEmployee(){

}

function updateAnEmployeeRole(){

}

function quit(){
    process.exit();
}