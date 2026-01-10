const fs = require('fs');
const Auth = require('../src/auth');

const mockUsers = [
  {
    username: 'user',
    password: 'pass',
  },
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
    expect(auth.validateCredentials('user', 'pass')).toBe(true);
  });

  it('should invalidate incorrect credentials', () => {
    expect(auth.validateCredentials('user', 'wrong')).toBe(false);
    expect(auth.validateCredentials('wrong', 'pass')).toBe(false);
  });

  it('should sanitise credentials by trimming whitespace', () => {
    expect(auth.validateCredentials('  user  ', '  pass  ')).toBe(true);
  });
});
