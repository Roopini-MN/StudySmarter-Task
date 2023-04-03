const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity:false,
  viewportHeight:720,
  viewportWidth:1280,
  defaultCommandTimeout:6000,
  pageLoadTimeout:70000,
  includeShadowDom:true,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    experimentalSessionAndOrigin:true,
    hideXHRInCommandLog: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
