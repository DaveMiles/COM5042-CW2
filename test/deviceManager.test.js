const fs = require('fs');

const mockDevices = [
  { id: 1, name: 'Lamp', type: 'Light', owner: 'user1' },
  { id: 2, name: 'Thermostat', type: 'Climate', owner: 'user2' },
  { id: 3, name: 'Camera', type: 'Security', owner: 'user1' },
];

jest.mock('fs');

describe('DeviceManager', () => {
  beforeEach(() => {
    fs.readFileSync.mockImplementation((filePath, encoding) => {
      if (filePath.includes('devices.json')) {
        return JSON.stringify(mockDevices);
      }
      return '';
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.todo('should load devices for the specified user');

  it.todo('should not load devices for other users');

  it.todo('should list devices in the correct format');
});
