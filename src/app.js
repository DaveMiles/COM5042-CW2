#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Welcome to the Smart Home Automation App!');

function mainMenu() {
  rl.question(`Select one of the following options: 
    1) Login 
    2) Exit`), (answer) => {
    switch(answer.trim()) {
      case '1':
        login();
        break;
      case '2':
        exit();
        break;
      default:
        console.log('Invalid option, please try again.');
        mainMenu();
    }
}}


function exit() {
  console.log('Goodbye!');
  rl.close();
}
function login() {
  
}

mainMenu();
