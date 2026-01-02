#!/usr/bin/env node
const Auth = require('./auth.js');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome to the Smart Home Automation App!');

function mainMenu() {
  rl.question(
    `Select one of the following options:\n  1) Login\n  2) Exit\n> `,
    (answer) => {
      switch (answer.trim()) {
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
    }
  );
}

function exit() {
  console.log('Goodbye!');
  rl.close();
}
function login() {
  rl.question('Enter username: ', (username) => {
    rl.question('Enter password: ', (password) => {
      const isAuthenticated = Auth.validateCredentials(username, password);
      if (isAuthenticated) {
        console.log(`Login successful! Welcome, ${username}.`);
        // todo: add logged in view
      } else {
        console.log('Invalid credentials. Please try again.');
        mainMenu();
      }
    });
  });
}

mainMenu();
