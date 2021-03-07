const inquirer = require("inquirer")
// const start = require ('/employee-tracker')
// const cTable = require('console.table');
// const cTable = require('console.table');

const view = (connection) => {
    inquirer.prompt(
      [
        {
            name: "view",
            type: 'list',
            message: 'What would you like to view?',
            choices:['DEPARTMENTS', 'ROLES', "EMPLOYEES","EMPLOYEES by MANAGER"]
        }
      ]
    ).then((answer) => {
        switch (answer.view) {
            case 'DEPARTMENTS':
            department(connection);
            break;
    
            case 'ROLES':
            role(connection);
            break;
    
            case 'EMPLOYEES':
            employees(connection);
            break;

            case 'EMPLOYEES by MANAGER':
            viewbymg(connection);
            break;
    
            default:
                consolog.log(`Invalid action: ${answer.view}`);
                break;
        }
    });
};

const department = (connection) => {
    console.log('Selecting all departments..\n');
    connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table('Departments', res);
      connection.end;
      // start(connection);
    });
  };

  const role = (connection) => {
    console.log('Selecting all roles..\n');
    connection.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table('Roles', res);
      connection.end;
      // start(connection);
    });
  };

  const employees = (connection) => {
    console.log('Selecting all employees..\n');
    connection.query('SELECT * FROM employees', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table('Employees', res);
      connection.end;
      // start(connection);
    });
  };

  const viewbymg = (connection) => {
    connection.query('SELECT * FROM manager', (err, results) => {
      if (err) throw err;

      inquirer.prompt(
        [
          {
            name: "mgrName",
            type: 'list',
            choices() {
              const mgrArray = [];
              results.forEach(({id, mgr_name}) => {
                let mgr = {
                  name: `${mgr_name}`,
                  value: id,
                }
                mgrArray.push(mgr);
              });
              return mgrArray;
            },
            message: "Who's employees would you like to view?"
          }
        ]
      ).then ((answer) => {
    
    console.log('Selecting all employees by manager..\n');
    connection.query('SELECT first_name, last_name FROM employees INNER JOIN manager ON employees.manager_id = manager.id WHERE manager.id ?', (err, res) => {
      if (err) throw err;
      [   
        {
        id: answer.mgrName,
        },  
      ],
      // Log all results of the SELECT statement
      console.table('Employees', res);
      connection.end;
    });
    });
    })
  };
// SELECT title, firstName, lastName
// FROM books
// INNER JOIN authors ON books.authorId = authors.id;

module.exports = {view, department, role, employees, viewbymg};
// module.exports = view;
// module.exports = department;
// module.exports = role;
// module.exports = employees;

