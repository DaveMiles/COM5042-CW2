class Auth {
  constructor() {
    const fs = require('fs');
    const path = require('path');
    const usersPath = path.join(__dirname, '../database/users.json');
    this.users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    this.minInputLength = 1;
    this.maxInputLength = 20;
  }

  validateCredentials(usernameInput, passwordInput) {
    const username = this.sanitiseInput(usernameInput);
    const password = this.sanitiseInput(passwordInput);

    // If both the username and password have been validated and are not null
    if (username && password) {
      const passwordHash = this.hashPassword(password); 

      return this.users.find(
        (u) => u.username === username && u.passwordHash === passwordHash
      );
    }

    return null;

  }

  sanitiseInput(userInput) {
    const input = String(userInput).trim();

    if (input.length >= this.minInputLength && input.length <= this.maxInputLength){
      return input;
    }

    return null;
  
  }

  hashPassword(password) {
    const crypto = require('crypto')
    
    return crypto.createHash('sha256').update(password).digest('hex');
  }

}

module.exports = new Auth();
