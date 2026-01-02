class Auth {
  constructor() {
    const fs = require('fs');
    const path = require('path');
    const usersPath = path.join(__dirname, '../database/users.json');
    this.users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  }

  validateCredentials(usernameInput, passwordInput) {
    const { username, password } = this.sanitiseCredentials(
      usernameInput,
      passwordInput
    );

    return this.users.find(
      (u) => u.username === username && u.password === password
    );
  }

  sanitiseCredentials(usernameInput, passwordInput) {
    return {
      username: usernameInput.trim(),
      password: passwordInput.trim(),
    };
  }
}

module.exports = new Auth();
