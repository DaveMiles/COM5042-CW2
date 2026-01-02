#!/usr/bin/env node
const Auth = require('./auth.js');
const readline = require('readline');

class SmartHomeApp {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  start() {
    console.log('Welcome to the Smart Home Automation App!');
    this.mainMenu();
  }

  mainMenu() {
    this.rl.question(
      `Select one of the following options:\n  1) Login\n  2) Exit\n> `,
      (answer) => {
        switch (answer.trim()) {
          case '1':
            this.login();
            break;
          case '2':
            this.exit();
            break;
          default:
            console.log('Invalid option, please try again.');
            this.mainMenu();
        }
      }
    );
  }

  exit() {
    console.log('Goodbye!');
    this.rl.close();
  }

  login() {
    this.rl.question('Enter username: ', (username) => {
      this.rl.question('Enter password: ', (password) => {
        const isAuthenticated = Auth.validateCredentials(username, password);
        if (isAuthenticated) {
          console.log(`Login successful! Welcome, ${username}.`);
          // todo: add logged in view
        } else {
          console.log('Invalid credentials. Please try again.');
          this.mainMenu();
        }
      });
    });
  }
}

const app = new SmartHomeApp();
app.start();
