class Auth {
  constructor() {
    const fs = require('fs');
    const path = require('path');
    const usersPath = path.join(__dirname, '../database/users.json');
    this.users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  }

  validateCredentials(username, password) {
    return this.users.find(
      (u) => u.username === username && u.password === password
    );
  }
}

module.exports = new Auth();
