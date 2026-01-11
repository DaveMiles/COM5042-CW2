#!/usr/bin/env node
const Auth = require('./auth.js');
const DeviceManager = require('./deviceManager.js');
const readline = require('readline');

class SmartHomeApp {
  constructor(rl) {
    this.rl =
      rl ||
      readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
    this.auth = new Auth();
  }

  start() {
    console.log('Welcome to the Smart Home Automation App!');
    this.mainMenu();
  }

  mainMenu() {
    this.rl.question(
      `Select one of the following options:\n  1) Login\n  2) Create account\n  3) Exit\n> `,
      (answer) => {
        switch (answer.trim()) {
          case '1':
            this.login();
            break;
          case '2':
            this.createAccount();
          break;
          case '3':
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

  async createAccount(){
    const name = await this.getVaildUserInput('Enter your name: ');
    
    let username = await this.getVaildUserInput('Create a username (between ' + this.auth.minInputLength + ' and ' + this.auth.maxInputLength + ' characters): ');
    while (this.auth.checkUsernameAlreadyTaken(username)){
      console.log('Username already taken. Please choose another.');
      username = await this.getVaildUserInput('Create a username (between ' + this.auth.minInputLength + ' and ' + this.auth.maxInputLength + ' characters): ');
    }

    const password = await this.getVaildUserInput('Create a password (between ' + this.auth.minInputLength + ' and ' + this.auth.maxInputLength + ' characters): ');
  
    this.auth.addUserAccount(name, username, password);
    
    this.mainMenu();
  }

  async getVaildUserInput(prompt){
    let input = null;

    while (input == null){
      const userAnswer = await new Promise(resolve =>
        this.rl.question(prompt, resolve)
      );
      input = this.auth.sanitiseInput(userAnswer);

      if (input == null) {
        console.log('Invalid input, please try again.');
      }

    };

    return input;
  }


  login() {
    this.rl.question('Enter username: ', (username) => {
      this.rl.question('Enter password: ', (password) => {
        this.user = this.auth.validateCredentials(username, password);
        if (this.user) {
          console.log(`Login successful! Welcome, ${this.user.displayName}.`);
          this.deviceManager = new DeviceManager(this.user.id);
          this.loggedInMenu();
        } else {
          console.log('Invalid credentials. Please try again.');
          this.mainMenu();
        }
      });
    });
  }

  loggedInMenu() {
    this.rl.question(
      `Select one of the following options:\n  1) View Devices\n  2) Control Device\n  3) Logout\n> `,
      (answer) => {
        switch (answer.trim()) {
          case '1':
            console.log(
              `Listing devices...\n${this.deviceManager.listDevices()}`
            );
            this.loggedInMenu();
            break;
          case '2':
            this.controlDevice();
            break;
          case '3':
            console.log('Logging out...');
            this.mainMenu();
            break;
          default:
            console.log('Invalid option, please try again.');
            this.loggedInMenu();
        }
      }
    );
  }

  controlDevice() {
    console.log(this.deviceManager.listDevices());
    this.rl.question(
      "\nEnter Device ID to toggle, or enter 'back' to go back: ",
      (input) => {
        if (input.trim() === 'back') {
          this.loggedInMenu();
          return;
        }
        const device = this.deviceManager
          .getUserDevices()
          .find((d) => d.id === parseInt(input.trim()));
        if (device) {
          switch (device.type) {
            case 'lightbulb':
              const currentStatus = device.status;
              const alternativeStatus = currentStatus === 'on' ? 'off' : 'on';
              this.rl.question(
                `Device is ${currentStatus}, would you like to turn it ${alternativeStatus}? (yes/no): `,
                (answer) => {
                  if (answer.trim().toLowerCase() === 'yes') {
                    device.status = alternativeStatus;
                    console.log(`Device turned ${alternativeStatus}.`);
                  } else {
                    console.log('No changes made to the device.');
                  }
                  this.controlDevice();
                }
              );
              break;
            case 'thermostat':
              // TODO: Implement thermostat control
              break;
            case 'alarm':
              // TODO: Implement alarm control
              break;
            case 'camera':
              // TODO: Implement camera control
              break;
            default:
              console.log('Unknown device type.');
              this.loggedInMenu();
          }
        } else {
          console.log('Device not found.');
          this.loggedInMenu();
        }
      }
    );
  }
}

module.exports = SmartHomeApp;

if (require.main === module) {
  const app = new SmartHomeApp();
  app.start();
}
