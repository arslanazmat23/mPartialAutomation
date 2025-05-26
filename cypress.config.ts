import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import esbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
//import nodemailer from "nodemailer"; // :white_check_mark: import nodemailer for email task
export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    setupNodeEvents(on, config) {
      // Cucumber preprocessor
      addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [esbuildPlugin(config)],
        })
      );
      // :white_check_mark: Email task integration
      // on("task", {
      //   sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
      //     const transporter = nodemailer.createTransport({
      //       service: "gmail",
      //       auth: {
      //         user: "daniyal.waheed@nullbrainer.io",
      //         pass: "mzko pfpz befc wcnw", // :warning: Consider moving this to env variables
      //       },
      //     });
      //     const mailOptions = {
      //       from: "daniyal.waheed@nullbrainer.io",
      //       to,
      //       subject,
      //       text,
      //     };
      //     return transporter
      //       .sendMail(mailOptions)
      //       .then((info) => {
      //         return `Email sent: ${info.response}`;
      //       })
      //       .catch((error) => {
      //         return `Email error: ${error.message}`;
      //       });
      //   },
      // });
      return config;
    },
    baseUrl: "https://dev.mpartial.io/", // Change as needed
  },
});