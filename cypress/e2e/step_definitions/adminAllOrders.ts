// // cypress/e2e/adminAllOrders.ts
// import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// let firstRowXactimate: string;

// //
// // Background #1: real UI login (lands on 2FA screen)
// //
// Given("the admin user is logged in", () => {
//   cy.viewport(1280, 800);
//   cy.visit("/mpartialadmin");
//   cy.get('input[placeholder="Username"]').type("arslan");
//   cy.get('input[type="password"]').type("harslan12345");
//   cy.get('.btn').click();
//   cy.url().should("include", "/enable2FA/arslan");
// });

// //
// // Background #2: click “Orders” in the sidebar, land on /allorders
// //
// Given("the admin navigates to the All Orders page", () => {
//   cy.get("aside").contains("Orders").click();
//   cy.url().should("include", "/allorders");
//   // wait for the three tabs to render
//   cy.get(".allOrderTable span button", { timeout: 10_000 })
//     .should("have.length", 3);
// });

// //
// // URL fragment assertion (shared step)
// //
// // Then('the URL should include {string}', (frag: string) => {
// //   cy.url().should("include", frag);
// // });

// //
// // Active-tab assertion
// //
// Then('the {string} tab is active', (tabLabel: string) => {
//   cy.get(".allOrderTable span button.active")
//     .should("contain.text", tabLabel);
// });

// //
// // click-by-text tab step
// //
// When('the admin clicks the {string} tab', (tabLabel: string) => {
//   cy.get(".allOrderTable span button")
//     .contains(tabLabel)
//     .click();
// });

// //
// // header readout assertion
// //
// Then('the orders table header reads {string}', (headerText: string) => {
//   cy.get(".allOrderTable span button.active")
//     .should("contain.text", headerText);
// });

// //
// // remember Xactimate’s first row, then compare after switching
// //
// When('the admin notes the first row under {string}', (tabLabel: string) => {
//   cy.get(".allOrderTable .tab-content table tbody tr:first-child td:first-child")
//     .invoke("text")
//     .then((t) => {
//       firstRowXactimate = t.trim();
//     });
// });

// Then('the first row under {string} is different from Xactimate', (tabLabel: string) => {
//   cy.get(".allOrderTable .tab-content table tbody tr:first-child td:first-child")
//     .invoke("text")
//     .should((t) => {
//       expect(t.trim()).not.to.equal(firstRowXactimate);
//     });
// });

// //
// // pagination click + verify
// //
// When('the admin clicks page {string} in the paginator', (pageNum: string) => {
//   cy.get(".pagination-container")
//     .should("be.visible")
//     .contains(pageNum)
//     .click();
// });

// Then('the page {string} is selected in paginator', (pageNum: string) => {
//   cy.get('.pagination-container li.selected')
//     .should('contain.text', pageNum);
// });

// cypress/e2e/adminAllOrders.ts
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// --- Background steps ---
Given('the admin user is logged in', () => {
  // replace with your real login helper if you have one
  cy.visit('/mpartialadmin')
  cy.get('input[placeholder="Username"]').type('arslan')
  cy.get('input[placeholder="Password"]').type('harslan12345')
  cy.get('.btn').click()
  cy.url().should('include', '/enable2FA')
})

Given('the admin navigates to the All Orders page', () => {
  cy.get('aside').contains('Orders').click()
  cy.url().should('include', '/allorders')
})

Given('the admin is on the All Orders page', () => {
  // if you prefer a single step instead of two above:
  cy.visit('/mpartialadmin')
  // cy.get('input[placeholder="Username"]').type('arslan')
  // cy.get('input[placeholder="Password"]').type('harslan12345')
  // cy.get('.btn').click()
  cy.get('aside').contains('Orders').click()
  cy.url().should('include', '/allorders')
})

// --- Tab clicking & active assertions ---
When('the admin clicks the {string} tab', (tabName: string) => {
  cy.contains('button.orderTableTab', tabName).click()
})

// Then('the URL should include {string}', (fragment: string) => {
//   cy.url().should('include', fragment)
// })

Then('the {string} tab is active', (tabLabel: string) => {
  cy.get(".allOrderTable span button.active")
    .should("contain.text", tabLabel);
})

// --- Header text under the tab ---
Then('the orders table header reads {string}', (header: string) => {
  // your header lives in a span inside .allOrderTable
  cy.get('section.allOrderTable span').should('contain.text', header)
})

// --- remembering and comparing first‐row text ---
Given('the admin is viewing the {string} tab', (tabName: string) => {
  cy.contains('button.orderTableTab.active', tabName)
    .should('be.visible')
})

When('the admin notes the first row under {string}', (_tabName: string) => {
  cy.get('section.allOrderTable table tbody tr:first-child td:first-child')
    .invoke('text')
    .as('firstRowText')
})

Then(
  'the first row under {string} is different from Xactimate',
  (_tabName: string) => {
    cy.get('section.allOrderTable table tbody tr:first-child td:first-child')
      .invoke('text')
      .then((newText) => {
        cy.get<string>('@firstRowText').should('not.equal', newText)
      })
  }
)

// --- pagination ---
Given('there are multiple pages of orders available', () => {
  cy.get('.pagination-container li').its('length').should('be.gt', 3)
})

When('the admin clicks page {string} in the paginator', (pageNum: string) => {
  cy.get(".pagination-container").contains(pageNum).click()
})

Then('the page {string} is selected in paginator', (pageNum: string) => {
  cy.get('.pagination-container li.selected').should('contain.text', pageNum)
})
