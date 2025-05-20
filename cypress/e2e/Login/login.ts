import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the example page", () => {
  cy.visit("https://example.com");
});

Then('I should see the page title {string}', (title: string) => {
  cy.title().should("eq", title);
});
