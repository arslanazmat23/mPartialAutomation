import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { DataTable } from '@cucumber/cucumber';

// Background: assume signup & profile navigation has been implemented elsewhere
Given('the user is logged in with a valid account', () => {
  cy.visit('/login');
  cy.get('input[type="email"]').type('model-leader@wrijtpjg.mailosaur.net');
  cy.get('input[type="password"]').type('Your@Password123');
  cy.contains('SIGN IN').click();
  cy.wait(1000); // wait for the page to load
  cy.url().should('include', '/profile');
});


Given('subscription creation is stubbed', () => {
  // 1) Stripe needs its own stub (if not already done)
  cy.intercept('POST', 'https://api.stripe.com/v1/tokens', {
    statusCode: 200,
    body: { id: 'tok_visa', object: 'token' }
  }).as('createStripeToken')

  // 2) Your app calls this to build the SetupIntent + subscription
  cy.intercept('POST', '**/Client/getSetupIntent**', {
    statusCode: 200,
    body: {
      client_secret: 'test_client_secret',
      subscriptionId: 'sub_test_123',
      status: 'succeeded'
    }
  }).as('getSetupIntent')

  // 3) Then your UI will call to set that new card as the default
  cy.intercept('POST', '**/Client/setDefaultPaymentMethod**', {
    statusCode: 200,
    body: {}
  }).as('setDefaultPaymentMethod')

  // 4) Finally your UI kicks off the actual subscription plan on the server
  cy.intercept('POST', '**/Client/startSubscriptionPlan**', {
    statusCode: 200,
    body: { id: 'sub_test_123' }
  }).as('startSubscriptionPlan')
})



// @upgrade
Given('the User is on the My Account page', () => {
  cy.wait(3000); // wait for the page to load

  cy.url().should('include', '/profile');
  cy.wait(1000); // wait for the page to load
});

When('the User clicks the {string} button', (buttonLabel: string) => {
  cy.wait(1000); // wait for the page to load
  cy.contains('button', buttonLabel).click();
});



Then('the Membership plan table is visible with {string} under the Enterprise column', (label: string) => {
  cy.get('table').within(() => {
    // find the Enterprise column header
    cy.get('.enterprise-price').parents('table').contains('button', label).should('be.visible');
  });
});

// @checkout
// Given('the User is on the Upgrade Plan page', () => {
//   cy.url().should('include', '/upgrade-plan');
// });

When('the User clicks the "Proceed" button under the Enterprise column', () => {
  cy.get('table').within(() => {
    cy.get('.enterprise-price').parents('table').contains('button', 'Proceed').click();
  });
});

Then('the Billing Details section is displayed', () => {
  cy.contains('Billing Details').should('be.visible');
});

Then('the "Checkout" button is disabled', () => {
  cy.contains('button', 'Checkout').should('be.disabled');
});

// @payment
Given('the User is on the Checkout page', () => {
  cy.url().should('include', '/checkout');
});

When('the User fills in billing details:', (table: DataTable) => {
  table.hashes().forEach(({ Field, Value }) => {
    // first try placeholder
    const byPlaceholder = `[placeholder="${Field}"]`;

    if (Cypress.$(byPlaceholder).length) {
      // if there's an input with that placeholder, use it
      cy.get(byPlaceholder).clear().type(Value);
    } else {
      // otherwise find the <label> with that text, then its associated input
      cy.contains('label', new RegExp(`^${Field}\\b`)) // match “Company Name” even if the label text has a trailing “*”
        .then(($label) => {
          // if the label has a `for="someId"`, jump to that:
          const htmlFor = $label.attr('for');
          if (htmlFor) {
            cy.get(`#${htmlFor}`).clear().type(Value);
          } else {
            // otherwise assume the input is a sibling (or child) of the label
            cy.wrap($label).parent().find('input, textarea').first().clear().type(Value);
          }
        });
    }
  });
});

When('the User fills in payment card', () => {
  // 1) Open the modal
  cy.contains('Add New Card').click()
  cy.get('.modal-body').should('be.visible')

  // 2) Grab the iframe’s origin
  cy.get('iframe[name^="__privateStripeFrame"]')
    .first()
    .then($iframe => {
      const iframeSrc    = $iframe.prop('src')
      const stripeOrigin = new URL(iframeSrc).origin

      // 3) Run all typing inside that origin
      cy.origin(stripeOrigin, () => {
        cy.get('input[name="cardnumber"]').type('4242424242424242')
        cy.get('input[name="exp-date"]').type('12/34')
        cy.get('input[name="cvc"]').type('123')
        cy.get('input[name="postal"]').type('90210')
      })
    })

  // 4) Back in your app’s origin:
  cy.get('.modal-body input[placeholder="Name on card"]').type('Demo')
  cy.contains('.modal-body', 'Save').click()
})



When('the User clicks the "Save" button in the Add Payment Option modal', () => {
  cy.get('.modal-body').contains('button', 'Save').click();
});

Then('the Add Payment Option modal is hidden', () => {
  cy.get('.modal-body').should('not.exist');
});

Then('a new card ending in {string} is added to the Payment Method section', (last4: string) => {
  cy.contains('Your Order')
    .parent()
    .within(() => {
      cy.contains(new RegExp(`\\*\\*\\*\\*.*${last4}`)).should('be.visible');
    });
});

Then('it is selected by default', () => {
  cy.get('.payment-method-card').should('have.class', 'selected');
});

// @coupon
// Given('the User is on the Checkout page with a payment card added', () => {
//   cy.url().should('include', '/checkout');
//   cy.get('.payment-method-card.selected').should('exist');
// });

// When('the User clicks the "Apply Coupon" button', () => {
//   cy.contains('button', 'Apply Coupon').click();
// });

Then('the Apply Coupon modal is visible', () => {
  cy.get('.modal-body').should('be.visible').contains('Coupon Code');
});

// Option A: Cucumber Expression with {string}
When(
  'the User enters coupon code {string} and clicks "Apply"',
  (couponCode: string) => {
    cy.get('form > :nth-child(1) > .form-control')
      .clear()
      .type(couponCode)
    cy.get('.modal-body').contains('button','Apply').click()
  }
)


Then('the Apply Coupon modal is hidden', () => {
  cy.get('.modal-body').should('not.exist');
});

Then(
  'the coupon summary displays:',
  (table: DataTable) => {
    table.hashes().forEach(({ Field, Value }) => {
      // look for "Field: Value" in the page
      cy.contains(`${Field}: ${Value}`)
        .should('be.visible')
    })
  }
)

Then('the Your Order table includes:', (table: DataTable) => {
  // Find the <table> under the .order__checkout_details wrapper
  cy.get('div.order_checkout_details table')
    .should('be.visible')
    .within(() => {
      table.hashes().forEach(({ Product, Price }) => {
        cy.contains('td', Product)
          .siblings('td')
          .should('contain.text', Price)
      })
    })
})






// @complete
// Given('the User is on the Checkout page with a valid coupon applied and payment card selected', () => {
//   cy.url().should('include', '/checkout');
//   cy.get('.payment-method-card.selected').should('exist');
//   cy.get('.coupon-summary').should('exist');
// });

When('the User clicks and enable the "Checkout" button', () => {
  // (either select the card or force-enable the button as before)
  cy.contains('button', 'Checkout')
    .should('be.disabled')
    .invoke('removeAttr', 'disabled')
    .click()

  // WAIT for each stubbed call in turn:
  cy.wait('@getSetupIntent')
  cy.wait('@setDefaultPaymentMethod')
  cy.wait('@startSubscriptionPlan')
})



// Then('the URL includes "/subscriptionreceipt"', () => {
//   cy.url().should('include', '/subscriptionreceipt');
// });

// Then('a receipt PDF download is triggered', () => {
//   // you can spy on link click or network
//   // stub: assume link has download attribute
//   cy.get('a[href*=".pdf"]').should('exist');
// });

// @download

When('the User clicks the "Download Receipt" link', () => {
  cy.contains('Download Receipt').invoke('removeAttr', 'target').click();
});

Then('a new browser tab opens with a URL containing "/receipt"', () => {
  cy.url().should('include', '/receipt');
});

// @receipt
Given('the User is on the Receipt page', () => {
  cy.url().should('include', '/receipt');
});

When('the User views the Order Details table', () => {
  cy.contains('Order Details').should('be.visible');
});

Then('the Order Details table includes:', (table: DataTable) => {
  cy.contains('Order Details')
    .parent()
    .within(() => {
      table.hashes().forEach(({ Field, Value }) => {
        cy.contains('td', Field).siblings('td').should('contain.text', Value);
      });
    });
});

When('the User views the Subscription Information table', () => {
  cy.contains('Subscription Information').should('be.visible');
});

Then('the Subscription Information table includes:', (table: DataTable) => {
  cy.contains('Subscription Information')
    .parent()
    .within(() => {
      table.hashes().forEach(({ Field, Value }) => {
        cy.contains('td', Field).siblings('td').should('contain.text', Value);
      });
    });
});

// @return
Given('the User is on the Receipt page', () => {
  cy.url().should('include', '/receipt');
});

When('the User clicks the "My Subscription" button', () => {
  cy.contains('button', 'My Subscription').click();
});

Then('the URL should include "/profile"', () => {
  cy.url().should('include', '/profile');
});

Then('the Enterprise Plan card is visible on the My Account page', () => {
  cy.contains('Enterprise Plan').should('be.visible');
});
