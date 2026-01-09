const SmartHomeApp = require('../src/app');

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
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(app, 'mainMenu');

    app.start();

    const WELCOME_MESSAGE = `Welcome to the Smart Home Automation App!`;
    expect(console.log).toHaveBeenCalledWith(WELCOME_MESSAGE);
    expect(app.mainMenu).toHaveBeenCalled();
    expect(mockRl.question).toHaveBeenCalledWith(
      expect.stringContaining('Select one of the following options'),
      expect.any(Function)
    );
  });

  it.todo('should handle login with valid credentials');
  it.todo('should reject login with invalid credentials');
  it.todo('should show logged in menu after successful login');
  it.todo('should exit the app and close readline interface');
  it.todo('should display devices in logged in menu');
  it.todo('should handle device control selection');
  it.todo('should toggle lightbulb device status');
  it.todo('should handle invalid menu options in main menu');
  it.todo('should handle invalid menu options in logged in menu');
  it.todo('should return to main menu after logout');
});
