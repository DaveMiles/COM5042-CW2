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
    const creds = this.sanitiseCredentials(
      usernameInput,
      passwordInput
    );

    if (creds) {
      const { username, password } = creds;
      const passwordHash = this.hashPassword(password); 

      return this.users.find(
        (u) => u.username === username && u.passwordHash === passwordHash
      );
    }

    return null;

  }

  sanitiseCredentials(usernameInput, passwordInput) {
    const username = String(usernameInput).trim();
    const password = String(passwordInput).trim();

    if (username.length >= this.minInputLength && username.length <= this.maxInputLength
       && password.length >= this.minInputLength && password.length <= this.maxInputLength){
      return {
            username: username,
            password: password,
          };
    }

    return null;
  
  }

  hashPassword(password) {
    const crypto = require('crypto')
    
    return crypto.createHash('sha256').update(password).digest('hex');
  }

}

module.exports = new Auth();
