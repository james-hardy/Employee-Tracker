const mysql = require('mysql');
const inquirer = require('inquirer');
const add = require('./data/add');
const view = require('./data/view');
const whatToUpdate = require ('./data/update')
const update = require('./data/update');
const cTable = require('console.table');
const routes = require('./connection');
// const { allowedNodeEnvironmentFlags } = require('process');
// const { id } = require('prelude-ls');


const connection = require('./connection');

//begin our sequence here
const start = () => {
  inquirer
    .prompt({
      name: 'viewAdd',
      type: 'list',
      message: 'Would you like to add, view, or update an employee role?',
      choices: ['ADD', 'VIEW', 'UPDATE'],
    })
    .then((answer) => {
      if (answer.viewAdd === 'ADD') {
        //add function in separate js file
        add(connection);
      } else if (answer.viewAdd === 'VIEW') {
        //view function in separate js file
        view.view(connection);
      } else if (answer.viewAdd === 'UPDATE') {
        //update function in separate js file
        whatToUpdate(connection);
      } else {
        connection.end();
      }
    });
};

start();

module.exports = start;


