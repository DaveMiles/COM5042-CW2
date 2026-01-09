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
});
