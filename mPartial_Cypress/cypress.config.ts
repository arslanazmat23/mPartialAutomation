import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import esbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import MailosaurClient from "mailosaur";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler({ plugins: [esbuildPlugin(config)] }));

      const mailosaur = new MailosaurClient(config.env.MAILOSAUR_API_KEY);

      on("task", {
        async getMailosaurMessage({ serverId, sentTo }) {
          const message = await mailosaur.messages.get(serverId, {
            sentTo,
          });
          return message;
        },
      });

      return config;
    },
    specPattern: "cypress/e2e/**/*.feature",
    baseUrl: "https://dev.mpartial.io", // change as needed
  },
  env: {
      MAILOSAUR_API_KEY: "OHVTWfEwbw8Bg1exCLyUdqL8jOQOil4M",
      MAILOSAUR_SERVER_ID: "wrijtpjg",} 
});
