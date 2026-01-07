class Auth {
  constructor() {
    const fs = require('fs');
    const path = require('path');
    const usersPath = path.join(__dirname, '../database/users.json');
    this.users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  }

  validateCredentials(usernameInput, passwordInput) {
    const { username, passwordHash } = this.sanitiseAndHashCredentials(
      usernameInput,
      passwordInput
    );

    return this.users.find(
      (u) => u.username === username && u.passwordHash === passwordHash
    );
  }

  sanitiseAndHashCredentials(usernameInput, passwordInput) {
    const crypto = require('crypto')

    const passwordHash = crypto.createHash('sha256').update(passwordInput.trim()).digest('hex');
    
    return {
      username: usernameInput.trim(),
      passwordHash: passwordHash,
    };
  }

}

module.exports = new Auth();
