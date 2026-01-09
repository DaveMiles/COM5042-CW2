const SmartHomeApp = require('../src/app');

jest.mock('../src/auth', () => {
  return jest.fn().mockImplementation(() => ({
    validateCredentials: jest.fn(),
  }));
});
jest.mock('../src/deviceManager');

describe('SmartHomeApp', () => {
  let mockRl;
  let app;

  beforeEach(() => {
    mockRl = {
      question: jest.fn(),
      close: jest.fn(),
    };
    app = new SmartHomeApp(mockRl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start the app and show main menu', () => {
    const WELCOME_MESSAGE = `Welcome to the Smart Home Automation App!`;

    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(app, 'mainMenu');

    app.start();

    expect(console.log).toHaveBeenCalledWith(WELCOME_MESSAGE);
    expect(app.mainMenu).toHaveBeenCalled();
    expect(mockRl.question).toHaveBeenCalledWith(
      expect.stringContaining('Select one of the following options'),
      expect.any(Function)
    );
  });

  it('should handle login with valid credentials', () => {
    jest.spyOn(console, 'log').mockImplementation();

    const Auth = require('../src/auth');
    Auth.mockImplementation(() => ({
      validateCredentials: jest.fn().mockReturnValue(true),
    }));

    app = new SmartHomeApp(mockRl);
    jest.spyOn(app, 'loggedInMenu');

    app.login();

    // Get the first question callback (username prompt)
    const usernameCallback = mockRl.question.mock.calls[0][1];
    usernameCallback('testuser');

    // Get the second question callback (password prompt)
    const passwordCallback = mockRl.question.mock.calls[1][1];
    passwordCallback('testpass');

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('Login successful')
    );
    expect(app.loggedInMenu).toHaveBeenCalled();
    expect(app.isUserAuthenticated).toBe(true);
  });

  it('should reject login with invalid credentials', () => {
    jest.spyOn(console, 'log').mockImplementation();

    const Auth = require('../src/auth');
    Auth.mockImplementation(() => ({
      validateCredentials: jest.fn().mockReturnValue(false),
    }));

    app = new SmartHomeApp(mockRl);
    jest.spyOn(app, 'loggedInMenu');
    jest.spyOn(app, 'mainMenu');

    app.login();

    // Get the first question callback (username prompt)
    const usernameCallback = mockRl.question.mock.calls[0][1];
    usernameCallback('invalid-user');

    // Get the second question callback (password prompt)
    const passwordCallback = mockRl.question.mock.calls[1][1];
    passwordCallback('invalid-pass');

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('Invalid credentials')
    );
    expect(app.loggedInMenu).not.toHaveBeenCalled();
    expect(app.isUserAuthenticated).toBe(false);
    expect(app.mainMenu).toHaveBeenCalled();
  });

  it.todo('should show logged in menu after successful login');
  it.todo('should exit the app and close readline interface');
  it.todo('should display devices in logged in menu');
  it.todo('should handle device control selection');
  it.todo('should toggle lightbulb device status');
  it.todo('should handle invalid menu options in main menu');
  it.todo('should handle invalid menu options in logged in menu');
  it.todo('should return to main menu after logout');
});
