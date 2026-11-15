const config = {
  testDir: './tests',
  retries: 2,
  workers: 1,
  timeout: 30 * 1000,
  expect: {
 timeout: 5000,
  },


  reporter: 'html',


 use: {
 browserName: 'chromium',
 headless: false,
 trace: 'retain-on-failure',
 screenshot: 'only-on-failure',
  },
};

module.exports = config;
