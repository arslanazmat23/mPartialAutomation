import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// cypress/navigation/Navigation.ts

//
// — Background / Login
//
Given("the user is logged in", () => {
  cy.visit("/login");
  cy.get('input[type="email"]').type("harslan@nullbrainer.io");
  cy.get('input[type="password"]').type("Arslan12345@");
  cy.contains("SIGN IN").click();
  cy.url().should("include", "/profile");
});

//
// — Header links
//
When('the user navigate the {string} header link', (linkText: string) => {
  // if the toggler (hamburger) is visible, open the menu
  cy.get("button.navbar-toggler").then(($btn) => {
    if ($btn.is(":visible")) {
      cy.wrap($btn).click();
    }
  });

  // now click the actual nav-link
  cy.get("header")
    .contains("a", linkText)
    .invoke("removeAttr", "target")
    .click();
});

Then('the URL should include {string}', (partialUrl: string) => {
  cy.url().then((url) => {
    const lowerUrl = url.toLowerCase();
    const lowerFragment = partialUrl.toLowerCase();
    expect(lowerUrl).to.include(lowerFragment);
  });
});

Then('the landing page shows {string}', (text: string) => {
  cy.contains(text).should("be.visible");
});
Then('the page heading reads {string}', (heading: string) => {
  cy.get("h1").first().should("contain.text", heading);
});

Then("the Contact form is visible", () => {
  cy.get("form").should("be.visible");
});


//
// — Estimating software workflow
//
Given("the user is on the estimating software chooser", () => {
  cy.visit("/mpartialScope");
  cy.contains("Choose your estimating software").should("be.visible");
});

When('the user navigate the "Continue with Xactimate" button', () => {
  cy.contains("Continue with Xactimate").click();
});

//
// — Account / Profile navigation
//
When('the user opens the user menu and navigate {string}', (menuItem: string) => {
  // 1) Expand the header navbar if it’s collapsed
  cy.get("button.navbar-toggler").then(($btn) => {
    if ($btn.is(":visible")) {
      cy.wrap($btn).click();
    }
  });

  // 2) Click the user‐menu toggle (“Hey, Arslan”)
  cy.contains("Hey, Arslan").click();

  // 3) Wait for the dropdown to open, then click the correct item
  cy.get(".dropdown-menu")
    .should("be.visible")
    .contains(menuItem)
    .click();
});


// Then('the page heading reads {string}', (heading: string) => {
//   cy.get("h1").should("have.text", heading);
// });

Given("the user is on the My Account page", () => {
  cy.visit("/profile");
  cy.get("h1").should("have.text", "My Account");
});

When('the user navigate the {string} tab', (tabName: string) => {
  cy.contains(tabName).click();
});

Then('the {string} section is displayed', (sectionName: string) => {
  cy.contains(sectionName).should("be.visible");
});

When('the user navigate the "Manage Users" button', () => {
  cy.contains("Manage Users").click();
});

When('the user navigate the "Change Password" button', () => {
  cy.contains("Change Password").click();
});

Then("the Update Password modal is visible", () => {
  cy.get(".modal-title")
    .should("be.visible")
    .and("contain.text", "Update Password");
});
