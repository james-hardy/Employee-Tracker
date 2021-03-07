const inquirer = require("inquirer");
const view = require('./view');
// const cTable = require('console.table');

//function called if user will be adding
const add = (connection) => {
    inquirer
      .prompt({
        name: 'add',
        type: 'list',
        message: 'Would you like to add a department, a role, or an employee?',
        choices: ['DEPARTMENT', 'ROLE', 'EMPLOYEE'],
      })
      .then((answer) => {
        if (answer.add === 'DEPARTMENT') {
          addToDepartment(connection);
        } else if (answer.add === 'ROLE') {
          addToRole(connection);
        } else if (answer.add === 'EMPLOYEE') {
          addToEmployee(connection);
        } else {
          connection.end();
        }
      });
  };
  
  //function called if user will be adding to department
  const addToDepartment = (connection) => {
    inquirer.prompt(
      [
        {
        name: 'id',
        type: 'input',
        message: 'What is the new department ID?'
      },
      {
        name: 'name',
        type: 'input',
        message: 'What is the name of the department to be added?'
      },
    ]
    ).then((answer) => {
      console.log('Adding to Department...\n');
      const query = connection.query(
        'INSERT INTO department SET ?',
        {
          id: answer.id,
          name: answer.name,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} department inserted!\n`);
        }
      )
      view.department(connection);
    });
    
  };
  
  //function called if user will be adding to role
  const addToRole = (connection) => {
    inquirer.prompt(
      [
        {
        name: 'id',
        type: 'input',
        message: 'What is the new role ID?'
      },
      {
        name: 'title',
        type: 'input',
        message: "What is the employee's title?",
      },
      {
        name: 'salary',
        type: 'input',
        message: "What is the employee's salary",
      },
      {
        name: 'department_id',
        type: 'input',
        message: "What is the department id he will join?",
      },
    ]
    ).then((answer) => {
      console.log('Adding to role...\n');
      const query = connection.query(
        'INSERT INTO role SET ?',
        [
          {
          id: answer.id,
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} role inserted!\n`);
        }
      ]
      )
      view.role(connection);
    });
    
  };
  
  //function called if user will be adding to employee
  const addToEmployee = (connection) => {
    inquirer.prompt(
      [
        {
        name: 'id',
        type: 'input',
        message: "What is the new employee's ID?"
      },
      {
        name: 'firstName',
        type: 'input',
        message: "What is the employee's first name?",
      },
      {
        name: 'lastName',
        type: 'input',
        message: "What is the employee's last name",
      },
      {
        name: 'role_id',
        type: 'input',
        message: "What is the employee's role id?",
      },
      {
        name: 'manager_id',
        type: 'input',
        message: "What is the employee's manager id?",
      },
    ]
    ).then((answer) => {
      console.log(answer);
      console.log('Adding to employees...\n');
      const query = connection.query(
        'INSERT INTO employees SET ?',
        {
          id: answer.id,
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} employees inserted!\n`);
        }
      )
      view.employees(connection);
    });
    
  };

  module.exports = add;