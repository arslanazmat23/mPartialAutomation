import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { SignupPage } from '../../support/PageObjectModel/signup';

const signup = new SignupPage();
declare global {
  interface Window {
    grecaptcha?: {
      render: (el: any, opts: { callback: (token: string) => void }) => void;
      getResponse: () => string;
    };
  }
}

// Visit signup and check initial button state
Given('the user is on the signup page', () => {
  cy.visit('https://dev.mpartial.io/signup', {
    onBeforeLoad(win) {
      // stub the global grecaptcha object so your app's callback fires immediately
      win.grecaptcha = {
        render: (_el: any, opts: { callback: (token: string) => void }) => {
          opts.callback('fake-token');
        },
        getResponse: () => 'fake-token',
      };
    },
  });
});

Then('the "LET\'S DO THIS" button is disabled', () => {
  cy.get('#formButton').should('be.disabled');
});

// Email step & enablement
When('the user enters a valid email {string}', (email: string) => {
  cy.get('input[type="email"]').clear().type(email);
});

Then('the "LET\'S DO THIS" button is enabled', () => {
  cy.get('#formButton').should('be.enabled');
});

When('the user clicks "LET\'S DO THIS"', () => {
  cy.get('#formButton').click();
});

// Name page checks
Then('the first name and last name fields are visible', () => {
  cy.xpath("(//div[@class='input-group css-45y7ur'])[1]//input").should('be.visible');
  cy.xpath("(//div[@class='input-group css-45y7ur'])[2]//input").should('be.visible');
});

Then('the NEXT button on the name page is disabled', () => {
  cy.get('#formButton').should('be.disabled');
});

When('the user enters first name {string} and last name {string}', (firstName: string, lastName: string) => {
  cy.xpath("(//div[@class='input-group css-45y7ur'])[1]//input").clear().type(firstName);
  cy.xpath("(//div[@class='input-group css-45y7ur'])[2]//input").clear().type(lastName);
});

Then('the "NEXT" button is enabled', () => {
  cy.get('#formButton').should('be.enabled');
});

When('the user clicks "NEXT"', () => {
  cy.get('#formButton').click();
});

// Cell page checks
Then('the cell number field is visible', () => {
  cy.get('.form-control').should('be.visible');
});

Then('the NEXT button on the cell page is disabled', () => {
  cy.get('#formButton').should('be.disabled');
});

When('the user enters a valid cell number {string}', (cellNumber: string) => {
  cy.get("input[type='text']") // target the exact input
    .clear({ force: true }) // force clearing
    .type(cellNumber, { force: true }); // force typing
});

// Role page checks
Then('the role selection radio buttons are visible', () => {
  cy.get('input[type="radio"]').should('have.length.at.least', 6);
});

Then('the NEXT button on the role page is disabled', () => {
  cy.get('#formButton').should('be.disabled');
});

When('the user selects role {string}', (role: string) => {
  cy.contains('label', role).click();
});

// Password page checks
Then('the password and confirm-password fields are visible', () => {
  cy.xpath("(//input[@type='password'])[1]").should('be.visible');
  cy.xpath("(//input[@type='password'])[2]").should('be.visible');
});

Then('the "CREATE" button is disabled', () => {
  cy.get('#formButton').should('be.disabled');
});

When('the user enters password {string} and confirms it', (password: string) => {
  cy.xpath("(//input[@type='password'])[1]").clear().type(password);
  cy.xpath("(//input[@type='password'])[2]").clear({ force: true }).type(password, { force: true });
});

// Terms, CAPTCHA, and final create
When('the user checks the terms and conditions box', () => {
  cy.get('input[type="checkbox"]').check({ force: true });
});

When('the user completes the captcha verification', () => {
  // cy.log("Skipping CAPTCHA — manual or mock handling in CI");
});

Then('the "CREATE" button is enabled', () => {
  cy.get('#formButton').should('be.enabled');
});

When('the user clicks "CREATE"', () => {
  cy.get('#formButton').click();
});

// 7) Confirmation message
Then('the confirmation message is displayed', () => {
  cy.contains('check your inbox and verify your email').should('be.visible');
});

// When('the user clicks "CONTINUE"', () => {
//   // click the Continue button on the confirmation screen
//   cy.xpath("//button[normalize-space()='Continue']").click();
// });

// Then('the login page is displayed', () => {
//   // URL should include /login
//   cy.url().should('include', '/login');

//   // both fields should now be visible
//   cy.xpath("//input[@type='email']").should('be.visible');
//   cy.xpath("//input[@type='password']").should('be.visible');

//   // and the Sign In button
//   cy.get('#formButton').should('be.visible');
// });

// 8) Email verification via Mailosaur
When('the user retrieves and visits their verification link for {string}', (emailAddress: string) => {
  signup.retrieveEmailVerificationLink(emailAddress);
});

Then('the email verification page is displayed', () => {
  // 1) URL should include the confirm‐email route
  cy.url().should('include', '/Client/ConfirmEmail');

  // 2) The big success message must be visible
  cy.contains('Your email address is verified.').should('be.visible');

  // 3) “Proceed” button shows up
  cy.get(':nth-child(3) > .btn').click({ force: true });
});

// 9) CONTINUE to login
When('the user clicks "CONTINUE"', () => {
  cy.xpath("//button[normalize-space()='Continue']").click(); // this is the CONTINUE button
});

Then('the login page is displayed', () => {
  cy.url().should('include', '/login');
  cy.xpath("//input[@type='email']").should('be.visible');
  cy.xpath("//input[@type='password']").should('be.visible');
  cy.get('#formButton').should('be.visible');
});

// 10) Finally, log in with the same creds
When('the user logs in with {string} and {string}', (email, password) => {
  // cast to string so .type() is happy
  cy.xpath("//input[@type='email']")
    .clear()
    .type(email as string);

  cy.xpath("//input[@type='password']")
    .clear()
    .type(password as string);

  cy.get('#formButton').click();
});

Then('the profile is displayed', () => {
  cy.url().should('include', '/profile');
  // adjust this selector to something unique on your dashboard
  cy.contains('h1', 'My Account').should('be.visible');
});
