const fs = require('fs');
const DeviceManager = require('../src/deviceManager');

const mockDevices = [
  { id: 1, name: 'Lamp', type: 'Light', owner: 'user1' },
  { id: 2, name: 'Thermostat', type: 'Climate', owner: 'user2' },
  { id: 3, name: 'Camera', type: 'Security', owner: 'user1' },
];

jest.mock('fs');

describe('DeviceManager', () => {
  let deviceManager;
  fs.readFileSync.mockImplementation((filePath, encoding) => {
    return JSON.stringify(mockDevices);
  });
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load devices for the specified user', () => {
    deviceManager = new DeviceManager('user1');
    const expectedDevices = [
      { id: 1, name: 'Lamp', type: 'Light', owner: 'user1' },
      { id: 3, name: 'Camera', type: 'Security', owner: 'user1' },
    ];

    expectedDevices.forEach((device) => {
      expect(deviceManager.getUserDevices()).toContainEqual(device);
    });
  });

  it('should not load devices for other users', () => {
    deviceManager = new DeviceManager('user2');

    const notExpectedDevices = [
      { id: 1, name: 'Lamp', type: 'Light', owner: 'user1' },
      { id: 3, name: 'Camera', type: 'Security', owner: 'user1' },
    ];

    notExpectedDevices.forEach((device) => {
      expect(deviceManager.getUserDevices()).not.toContainEqual(device);
    });
  });

  it('should list devices in the correct format', () => {
    deviceManager = new DeviceManager('user1');
    const deviceList = deviceManager.listDevices();
    const expectedList =
      'Lamp (ID: 1, Type: Light)\nCamera (ID: 3, Type: Security)';
    expect(deviceList).toBe(expectedList);
  });
});
