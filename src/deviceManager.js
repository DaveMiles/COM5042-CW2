class DeviceManager {
  constructor(userId) {
    const fs = require('fs');
    const path = require('path');
    const devicesPath = path.join(__dirname, '../database/devices.json');
    const allDevices = JSON.parse(fs.readFileSync(devicesPath, 'utf8'));
    this.userDevices = allDevices.filter((device) => device.ownerId === userId);
  }

  getUserDevices() {
    return this.userDevices;
  }

  listDevices() {
    return this.userDevices
      .map(
        (device) => `${device.name} (ID: ${device.id}, Type: ${device.type})`
      )
      .join('\n');
  }
}

module.exports = DeviceManager;
