const {defineConfig}=require('@playwright/test');
module.exports=defineConfig({
  testDir:'./test',
  testMatch:'browser-qa.spec.js',
  timeout:30000,
  expect:{timeout:5000},
  fullyParallel:false,
  workers:1,
  reporter:'line',
  use:{
    baseURL:'http://127.0.0.1:8000',
    screenshot:'only-on-failure',
    trace:'retain-on-failure'
  },
  webServer:{
    command:'python3 -m http.server 8000 --bind 127.0.0.1',
    url:'http://127.0.0.1:8000',
    reuseExistingServer:true,
    timeout:15000
  }
});
