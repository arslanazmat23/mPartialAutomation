// cypress/e2e/adminAllOrders.ts
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let firstRowXactimate: string;

//
// Background #1: real UI login (lands on 2FA screen)
//
Given("the admin user is logged in", () => {
  cy.viewport(1280, 800);
  cy.visit("/mpartialadmin");
  cy.get('input[placeholder="Username"]').type("arslan");
  cy.get('input[type="password"]').type("harslan12345");
  cy.get('.btn').click();
  cy.url().should("include", "/enable2FA/arslan");
});

//
// Background #2: click “Orders” in the sidebar, land on /allorders
//
Given("the admin navigates to the All Orders page", () => {
  cy.get("aside").contains("Orders").click();
  cy.url().should("include", "/allorders");
  // wait for the three tabs to render
  cy.get(".allOrderTable span button", { timeout: 10_000 })
    .should("have.length", 3);
});

//
// URL fragment assertion (shared step)
//
// Then('the URL should include {string}', (frag: string) => {
//   cy.url().should("include", frag);
// });

//
// Active-tab assertion
//
Then('the {string} tab is active', (tabLabel: string) => {
  cy.get(".allOrderTable span button.active")
    .should("contain.text", tabLabel);
});

//
// click-by-text tab step
//
When('the admin clicks the {string} tab', (tabLabel: string) => {
  cy.get(".allOrderTable span button")
    .contains(tabLabel)
    .click();
});

//
// header readout assertion
//
Then('the orders table header reads {string}', (headerText: string) => {
  cy.get(".allOrderTable span button.active")
    .should("contain.text", headerText);
});

//
// remember Xactimate’s first row, then compare after switching
//
When('the admin notes the first row under {string}', (tabLabel: string) => {
  cy.get(".allOrderTable .tab-content table tbody tr:first-child td:first-child")
    .invoke("text")
    .then((t) => {
      firstRowXactimate = t.trim();
    });
});

Then('the first row under {string} is different from Xactimate', (tabLabel: string) => {
  cy.get(".allOrderTable .tab-content table tbody tr:first-child td:first-child")
    .invoke("text")
    .should((t) => {
      expect(t.trim()).not.to.equal(firstRowXactimate);
    });
});

//
// pagination click + verify
//
When('the admin clicks page {string} in the paginator', (pageNum: string) => {
  cy.get(".pagination-container")
    .should("be.visible")
    .contains(pageNum)
    .click();
});

Then('the page {string} is selected in paginator', (pageNum: string) => {
  cy.get('.pagination-container li.selected')
    .should('contain.text', pageNum);
});

