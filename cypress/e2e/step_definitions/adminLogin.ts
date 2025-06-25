import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is on the login page", () => {
  cy.visit("https://dev.mpartial.io/mpartialadmin");
});

When("the user enters a valid Username", () => {
  cy.get('input[placeholder="Username"]').type("arslan");
});

When("the user enters the correct password", () => {
  cy.get('input[type="password"]').type("harslan12345");
});

When("the user clicks the SIGN IN button", () => {
  cy.get('.btn').click();
});

Then("the login should succeed and the Orders dashboard appears", () => {
  // 1) Confirm URL change
  cy.url().should("include", "/enable2FA/arslan");

  // Confirm the brand logo is still visible in the header
  cy.get("a.mpartial_logo.navbar-brand")
    .should("be.visible");
});

