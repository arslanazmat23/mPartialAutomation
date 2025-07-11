import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
const DIALOG = '[Class = "support_body modal-body"]';

Given('User is on the Order Coupons page', () => {
  // click sidebar link
  cy.get('aside').contains('Order Coupons').click();
  cy.url().should('include', '/coupons');
});

// -- Create dialog open/close --
When('User click the Create New Coupon button', () => {
  cy.get('.btn').click();
});
Then('the Create Coupon dialog is displayed', () => {
  cy.get('form').should('be.visible');
});
Then('the Save button is disabled', () => {
  cy.get('#formButton').should('be.enabled').and('contain.text', 'Save');
});

Given('the Create Coupon dialog is open', () => {
  cy.get('.btn').click();
  cy.get('form').should('be.visible');
});
When('User click the Close icon', () => {
  cy.get('.close > [aria-hidden="true"]').click();
});
Then('the dialog is hidden', () => {
  cy.get('[data-test="support_body modal-body"]').should('not.exist');
});
Then('no coupon is added to the coupons list', () => {
  cy.get('.table-wrapper').should('not.contain.text', 'TESTPCT10');
});

// -- Valid percentage coupon --
When('User enter the following text fields:', (table: DataTable) => {
  cy.get(DIALOG).within(() => {
    table.hashes().forEach(({ Field, Value }) => {
      cy.contains('label', Field)
        .parent()
        .find('input')
        //.filter(':visible')
        .first()
        .scrollIntoView()
        //.clear({ force: true })
        .type(Value, { force: true });
    });
  });
});

When('User choose from the following dropdowns:', (table: DataTable) => {
  const rows = table.hashes();
  rows.forEach(({ Field, Option }) => {
    cy.get('label').contains(Field).parent().find('select').select(Option);
  });
});

When('User click Save', () => {
  cy.get(DIALOG)
    .find('[class="btn btn-lg"]')
    //.scrollIntoView()
    .click({ force: true });
});
Then('the Create Coupon dialog is hidden', () => {
  cy.get('[data-test="support_body modal-body"]').should('not.exist');
});
Then('the coupons table shows:', (table: DataTable) => {
  const raw = table.raw();
  // skip header row
  const [, [code, discount]] = raw;
  cy.get('.table-wrapper')
    .first()
    .within(() => {
      cy.get('td').eq(0).should('contain.text', code);
      cy.get('td').eq(4).should('contain.text', discount);
    });
});

// -- Prevent duplicate codes --
Given('a coupon with code {string} already exists', (existingCode: string) => {
  // stub API to return an existing coupon
  cy.intercept('GET', '/api/order-coupons*', {
    body: [{ code: existingCode, discount: 5 }],
  }).as('getCoupons');
});
When('User enter {string} as the Coupon Code', (code: string) => {
  cy.get('label').contains('Coupon Code').parent().find('input').clear().type(code, { force: true });
});
When('User fill in all other required fields with valid values', () => {
  cy.get(DIALOG).within(() => {
    // ---- Coupon Percentage ----
    // sanity-check the label
    cy.contains('label', 'Coupon Percentage').should('be.visible');
    // type into the actual input
    cy.get('input[placeholder="Coupon Percentage"]')
      .scrollIntoView()
      //.clear({ force: true })
      .type('10', { force: true });

    // ---- Start Date / Expiration Date ----
    cy.get('input[placeholder="Coupon Active From"]')
      .scrollIntoView()
      //.clear({ force: true })
      .type('2025-01-01', { force: true });

    cy.get('input[placeholder="Coupon Expiration Date"]')
      .scrollIntoView()
      //.clear({ force: true })
      .type('2025-01-02', { force: true });

    // ---- Product / Coupon Type / Coupon For ----
    cy.get('form > :nth-child(2) > .form-control').scrollIntoView().select('mpartialScope Xactimate', { force: true });

    cy.get(':nth-child(3) > .form-control').scrollIntoView().select('Percentage', { force: true });

    cy.get(':nth-child(5) > .form-control').scrollIntoView().select('Public', { force: true });
  });
});

Then('User see the inline error {string}', (msg: string) => {
  cy.get(DIALOG)
    .contains('span', msg) // find *any* element with your text
    .scrollIntoView(); // in case it’s off-screen or clipped
  //.should('be.visible');
});
Then('the dialog remains open', () => {
  cy.get(DIALOG).should('be.visible');
});
