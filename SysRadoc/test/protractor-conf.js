exports.config = {
  specs: [
    'e2e/features/*.feature'
  ],
  seleniumAddress: 'http://10.0.2.2:4444/wd/hub',
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:3030/',
  framework: 'cucumber',
};
