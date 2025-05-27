// cypress.config.ts
import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import esbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    baseUrl: "https://dev.mpartial.io/",
    setupNodeEvents(on, config) {
      // 1) Cucumber
      addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [esbuildPlugin(config)],
        })
      );

      // 2) Mailosaur
    // require("cypress-mailosaur/plugins")(on, config);

      // 3) return the updated config
      return config;
    },
    // 4) tell Cypress about your Mailosaur keys
    env: {
      MAILOSAUR_API_KEY: "OHVTWfEwbw8Bg1exCLyUdqL8jOQOil4M",
      MAILOSAUR_SERVER_ID: "wrijtpjg",
    },
  },
});
