#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

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
  const usersPath = path.join(__dirname, '../database/users.json');
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

  rl.question('Enter username: ', (username) => {
    rl.question('Enter password: ', (password) => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        console.log(`Login successful! Welcome, ${user.username}.`);
        // todo: add logged in view
      } else {
        console.log('Invalid credentials. Please try again.');
        mainMenu();
      }
    });
  });
}

mainMenu();
