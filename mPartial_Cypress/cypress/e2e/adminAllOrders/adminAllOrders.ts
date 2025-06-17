// cypress/e2e/adminAllOrdersTabs.ts
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let firstRowTextXactimate: string;

//
// Background #1: the admin user is logged in
//
Given("the admin user is logged in", () => {
  // purely UI-based login
  cy.visit("/mpartialadmin");
  cy.get('input[placeholder="Username"]').type("arslan");
  cy.get('input[type="password"]').type("harslan12345");
  cy.contains("SIGN IN").click();

  // after login we land on the 2FA screen
  cy.url().should("include", "/enable2FA/arslan");
});

//
// Background #2: the admin is on the All Orders page
//
Given("the admin navigates to the All Orders page", () => {
  // go straight to full orders
  cy.visit("/allorders");
  cy.get(".nav-tabs").should("be.visible");
});

//
// @orders-tabs
// Scenario: Default tab is mpartialScope - Xactimate
//
Then('the URL should include "/allorders"', () => {
  cy.url().should("include", "/allorders");
});

Then('the "{string}" tab is active', (tabLabel: string) => {
  cy.get(".nav-tabs")
    .contains(tabLabel)
    .should("have.class", "active")
    .and("be.visible");
});

//
// @orders-tabs
// Scenario: Switch to mpartialScope - Symbility tab
//
When('the admin clicks the "{string}" tab', (tabLabel: string) => {
  cy.get(".nav-tabs")
    .contains(tabLabel)
    .should("be.visible")
    .click();
});

Then('the orders table header reads "{string}"', (tabLabel: string) => {
  // double-check the active tab’s label
  cy.get(".nav-tabs .active").should("contain.text", tabLabel);
});

//
// @orders-tabs
// Scenario: Table content changes between tabs
//
When('the admin notes the first row under "{string}"', (tabLabel: string) => {
  // ensure we’re on the Xactimate tab
  cy.get(".nav-tabs")
    .contains(tabLabel)
    .should("have.class", "active");
  cy.get("table tbody tr")
    .first()
    .invoke("text")
    .then((txt) => {
      firstRowTextXactimate = txt.trim();
    });
});

When('the admin clicks the "{string}" tab', (tabLabel: string) => {
  // reuse the same click logic
  cy.get(".nav-tabs").contains(tabLabel).click();
});

Then("the first row under Symbility is different from Xactimate", () => {
  cy.get("table tbody tr")
    .first()
    .invoke("text")
    .then((txt) => {
      expect(txt.trim()).not.to.equal(firstRowTextXactimate);
    });
});

//
// @orders-tabs
// Scenario: Pagination works on Xactimate tab
//
When('the admin clicks page "{string}" in the paginator', (pageNum: string) => {
  cy.get(".pagination").contains(pageNum).click();
});

Then('the table shows page "{string}" rows', (pageNum: string) => {
  cy.get(".pagination li.active").should("contain.text", pageNum);
});
