import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is on the login page", () => {
  cy.visit("https://dev.mpartial.io/login");
});

When("the user enters a valid email address", () => {
  cy.get('input[type="email"]').type("harslan@nullbrainer.io");
});

When("the user enters the correct password", () => {
  cy.get('input[type="password"]').type("Arslan12345@");
});

When("the user clicks the SIGN IN button", () => {
  cy.contains("SIGN IN").click();
});

Then("the user should be logged in successfully", () => {
  // Example: check that a logout button or user profile appears
  cy.get("#formButton").should("be.visible");
});

Then("the user should be redirected to the dashboard", () => {
  cy.url().should("include", "/profile");
});