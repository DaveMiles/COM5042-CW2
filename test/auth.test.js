const fs = require('fs');
const Auth = require('../src/auth');

const mockUsers = [
  {
    "id": 0,
    "displayName": "Administrator",
    "username": "admin",
    "passwordHash": "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9"
  },
  {
    "id": 1,
    "displayName": "Dan",
    "username": "user1",
    "passwordHash": "0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e"
  },
  {
    "id": 2,
    "displayName": "Sam",
    "username": "user2",
    "passwordHash": "6cf615d5bcaac778352a8f1f3360d23f02f34ec182e259897fd6ce485d7870d4"
  }
];

jest.mock('fs');

describe('Auth', () => {
  let auth;
  fs.readFileSync.mockImplementation((filePath, encoding) => {
    return JSON.stringify(mockUsers);
  });

  beforeEach(() => {
    auth = new Auth();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate correct credentials', () => {
    const result = auth.validateCredentials('user1', 'password1');

    expect(result).not.toBeNull();
    expect(result.displayName).toBe('Dan');
  });

  it('should return null for incorrect credentials', () => {
    const result1 = auth.validateCredentials('user', 'wrong');
    const result2 = auth.validateCredentials('wrong', 'pass');
    expect(result1).toBeNull();
    expect(result2).toBeNull();
  });

  it('should sanitise vaild inputs by trimming whitespace', () => {
    const result = auth.sanitiseInput('  hello  ');
    expect(result).toBe('hello');
   
  });

  it('should return null if input is too short', () => {
    const result = auth.sanitiseInput('');
    expect(result).toBeNull();
  });

  it('should return null if input is too long', () => {
    const longInput = 'a'.repeat(auth.maxInputLength + 5);
    const result = auth.sanitiseInput(longInput);
    expect(result).toBeNull();
  });

  it('should return a consistent sha256 hash', () => {
    const hash1 = auth.hashPassword('password123');
    const hash2 = auth.hashPassword('password123');

    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64);
  });

  it('should generate different hashes for different passwords', () => {
    const hash1 = auth.hashPassword('password1');
    const hash2 = auth.hashPassword('password2');

    expect(hash1).not.toBe(hash2);
  });

  it('should return a next userId of 0 when no users exist', () => {
    auth.users = [];
    expect(auth.getNextUserId()).toBe(0);
  });

  it('should return the next user id', () => {
    expect(auth.getNextUserId()).toBe(3);
  });

  it('should return true if username already exists', () => {
      expect(auth.checkUsernameAlreadyTaken('admin')).toBe(true);
  });

  it('should return false if username does not already exist', () => {
    expect(auth.checkUsernameAlreadyTaken('newuser')).toBe(false);
  });

  it('should add a new user and write to file', () => {
    fs.writeFileSync.mockImplementation(() => {});

    auth.addUserAccount('Jo', 'jo123', 'secretpassword');

    expect(auth.users).toHaveLength(4);
    expect(auth.users[3]).toMatchObject({
      id: 3,
      displayName: 'Jo',
      username: 'jo123'
    });
  });

});
