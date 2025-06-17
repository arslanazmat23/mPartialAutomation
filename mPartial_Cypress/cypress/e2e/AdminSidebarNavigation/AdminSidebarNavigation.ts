// cypress/e2e/AdminSidebarNavigation.ts
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// pull creds from your cypress.config.ts
const ADMIN_USERNAME = Cypress.env("ADMIN_USERNAME") as string;
const ADMIN_PASSWORD = Cypress.env("ADMIN_PASSWORD") as string;

Given("the admin user is logged in", () => {

  // visit the real admin-login page
  cy.visit("/mpartialadmin");

  // type username & password
  cy.get('input[placeholder="Username"]').type(ADMIN_USERNAME);
  cy.get('input[type="password"]').type(ADMIN_PASSWORD);

  // click SIGN IN
  cy.get('.btn').click();

  // after login we land on 2FA setup page
  cy.url().should("include", `/enable2FA/${ADMIN_USERNAME}`);

  // sanity: sidebar must now exist
  cy.get("aside").should("be.visible");
});

When('the admin clicks the {string} sidebar link', (linkText: string) => {
  cy.get("aside")             // scope into the sidebar
    .contains("a", linkText)  // find the link by its exact text
    .should("be.visible")
    .click();
});

Then("the URL should include {string}", (fragment: string) => {
  cy.url().should("include", fragment);
});

Then("the page heading reads {string}", (heading: string) => {
  cy.get('h2').first().should("contain.text", heading);
});
