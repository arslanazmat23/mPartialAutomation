import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

const DIALOG = '[class="support_body modal-body"]';
const TABLE_WRAPPER = '.admin-order-wrap';

//
// — Background: admin is logged in & on Role Management
//
Given('I am logged in as an admin', () => {
  cy.visit('/mpartialadmin');
  cy.get('input[placeholder="Username"]').type('arslan');
  cy.get('input[placeholder="Password"]').type('harslan12345');
  cy.get('.btn').click();
  cy.url().should('include', '/enable2FA/arslan');
});

Given('I am on the Role Management page', () => {
  cy.get('aside').contains('Role Management').click();
  cy.url().should('include', '/role-management');
});

//
// — Open / close the Add New User dialog
//
When('I click the "Add new user" button', () => {
  cy.contains('button', 'Add new user').click();
});

Then('the Add New User dialog is displayed', () => {
  cy.get(DIALOG).should('be.visible');
});

Then('the Submit button is disabled', () => {
  cy.get(DIALOG)
    .contains('button', 'Submit').should('be.enabled').and('have.text', 'Submit');
});
//
// @role Scenario: Cancel Add New User dialog
//
Given('the Add New User dialog is open', () => {
  cy.contains('button', 'Add new user').click();
  cy.get(DIALOG).should('be.visible');
});

When('I click the close icon', () => {
  cy.get('.close > [aria-hidden="true"]').click();
});

Then('the dialog is hidden', () => {
  cy.get(DIALOG).should('not.exist');
});

Then('no new user is added to the users table', () => {
  cy.get(TABLE_WRAPPER).should('not.contain.value', 'newuser');
});

//
// — Create a valid new user
//
When('I fill in the following fields:', (table: DataTable) => {
  // for each field/value, do two fresh cy.get()s so React-remounts don't kill us
  table.hashes().forEach(({ Field, Value }) => {
    const selector = `input[placeholder="${Field}"]`;

    // 1) clear it
    cy.get(DIALOG).find(selector)
      .scrollIntoView()
      .should('be.visible')
      .clear({ force: true });

    // 2) type into it
    cy.get(DIALOG).find(selector)
      .scrollIntoView()
      .type(Value, { force: true });
  });
});

When('I click the Submit button', () => {
  // 1) Intercept the real POST endpoint before clicking
  cy.intercept('POST', '**/GIServer/AddNewAdminUser*').as('addUser');

  // 2) Scope your click to the modal’s own “Submit” button
  cy.get(DIALOG)
  .contains('button', 'Submit')
  .click({ force: true })
   //.then(() => {
   // cy.log('✅ clicked submit')
   // console.log('✅ clicked submit')
  

  // 3) Wait for that POST to finish before moving on
  cy.wait('@addUser');
});

// Then('the dialog is hidden', () => {
//   // first ensure we've navigated/stayed on the page, then assert the modal is gone
//   cy.url().should('include', '/role-management');
//   cy.get(DIALOG).should('not.exist');
// });

Then('the users table includes a row with:', (table: DataTable) => {
  const [{ 'User Name': userName, Email: email }] = table.hashes();
  cy.get(TABLE_WRAPPER)
    .contains('tr', userName)
    .should('exist')
    .within(() => {
      cy.get('td').eq(0).should('contain.text', userName);
      cy.get('td').eq(1).should('contain.text', email);
    });
});

//
// — Enable 2FA for an existing user
//
Given('I see user {string} in the users table', (userName: string) => {
  cy.get(TABLE_WRAPPER)
    .contains('tr', userName)
    .should('exist');
});

When('I click the view icon next to {string}', (userName: string) => {
  cy.get(TABLE_WRAPPER)
    .contains('tr', userName)
    // adjust this to your actual eye-icon selector:
    .find('button[aria-label="view"]')
    .click({ force: true });
});

Then('I navigate to {string}', (path: string) => {
  cy.url().should('include', path);
});

Then('the Generate QR Code button is visible', () => {
  cy.contains('button', 'Generate QR Code').should('be.visible');
});
