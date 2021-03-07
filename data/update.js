const inquirer = require("inquirer");
const view = require('./view');
// const cTable = require('console.table');

const whatToUpdate = (connection) => {
    inquirer
      .prompt({
        name: 'pick',
        type: 'list',
        message: 'Would you like to update?',
        choices: ['Employees ROLE', 'Employees MANAGER'],
      })
      .then((answer) => {
        if (answer.pick === 'Employees ROLE') {
          update(connection);
        } else if (answer.pick === 'Employees MANAGER') {
          updateMan(connection);
        } else {
          connection.end();
        }
      });
  };

const update = (connection) => {
    connection.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;

        inquirer.prompt(
            [
                {
                    name: "choices",
                    type: 'list',
                    choices() {
                        const choiceArray = [];
                        results.forEach(({ id, first_name, last_name }) => {
                            let employee = {
                                name: `${first_name} ${last_name}`,
                                value: id,
                            }
                            choiceArray.push(employee);
                        });
                        return choiceArray;
                    },
                    message: "What is the employee's first and last name who's role you will update?"
                },
                {
                    name: 'newRole',
                    type: 'type',
                    message: 'What is his/her new role id?,'
                },
            ],
        ).then((answer) => {
            const updateRole = (connection) => {
                console.log(`Updating role to ${answer.newRole} .\n`);
                connection.query(
                    'UPDATE employees SET ? WHERE ?',
                    [   {
                            role_id: answer.newRole,
                        },
                        {
                            id:answer.choices,
                        },
                    ],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res.affectedRows} role updated.\n`);
                    }
                )
                
            }
            updateRole(connection);
            view.employees(connection);
        });
    },
    )
};

  const updateMan = (connection) => {
    connection.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;

        inquirer.prompt(
            [
                {
                    name: "manchoices",
                    type: 'list',
                    choices() {
                        const choiceArray = [];
                        results.forEach(({ id, first_name, last_name }) => {
                            let employee = {
                                name: `${first_name} ${last_name}`,
                                value: id,
                            }
                            choiceArray.push(employee);
                        });
                        return choiceArray;
                    },
                    message: "What is the employee's first and last name who's manager you will update?"
                },
                {
                    name: 'newManager',
                    type: 'list',
                    choices() {
                        const manArray = [];
                        results.forEach(({id, mgr_name}) => {
                            let mgr = {
                                name: `${id}`,
                                value: id,
                            }
                            manArray.push(mgr);
                        })
                        return manArray
                    },
                    message: 'What is the employees new manager id?,'
                },
            ],
        ).then((answer) => {
            const updateManager = (connection) => {
                console.log(`Updating manager to ${answer.name} .\n`);
                connection.query(
                    'UPDATE employees SET ? WHERE ?',
                    [   {
                            manager_id: answer.newManager,
                        },
                        {
                            id:answer.manchoices,
                        },
                    ],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res.affectedRows} role updated.\n`);
                    }
                )
                
            }
            updateManager(connection);
            view.employees(connection);
        });
    },
    )
};




module.exports = update;
module.exports = whatToUpdate;
