#!/usr/bin/env node
const Auth = require('./auth.js');
const DeviceManager = require('./deviceManager.js');
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
        this.isUserAuthenticated = Auth.validateCredentials(username, password);
        if (this.isUserAuthenticated) {
          console.log(`Login successful! Welcome, ${username}.`);
          this.deviceManager = new DeviceManager(username);
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
            console.log('Controlling device... (not implemented)');
            this.controlDevicesMenu();
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

  controlDevicesMenu() {
    this.rl.question(
      `Select one of the following options:\n  1) Toggle Device\n  2) Back to Main Menu\n> `,
      (input) => {
        switch (input.trim()) {
          case '1':
            this.controlDevice();
            break;
          case '2':
            this.controlDevicesMenu();
            break;
          case '2':
            this.loggedInMenu();
            break;
          default:
            console.log('Invalid option, please try again.');
            this.controlDevicesMenu();
        }
      }
    );
  }

  controlDevice() {
    console.log(DeviceManager.listDevices());
    this.rl.question('Enter Device ID to toggle: ', (deviceId) => {
      const device = this.deviceManager
        .getUserDevices()
        .find((d) => d.id === deviceId.trim());
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
                this.controlDevicesMenu();
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
        }
      } else {
        console.log('Device not found.');
      }
      this.controlDevicesMenu();
    });
  }
}

const app = new SmartHomeApp();
app.start();
