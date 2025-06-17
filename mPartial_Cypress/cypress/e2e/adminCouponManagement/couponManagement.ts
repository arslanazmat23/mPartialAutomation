import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the admin is on the Order Coupons page", () => {
  // TODO: navigate to /coupons
});
When('the admin clicks the "Create New Coupon" button', () => {
  // TODO: click Create New Coupon
});
Then('the "Create New Coupon" modal is visible', () => {
  // TODO: assert modal appears
});
Then('the "Save" button is disabled', () => {
  // TODO: assert Save disabled
});

When('the admin clicks the "X" button', () => {
  // TODO: close modal
});
Then('the modal closes', () => {
  // TODO: assert modal gone
});
Then('no new coupon appears in the table', () => {
  // TODO: assert table unchanged
});

When('the admin fills:', (table) => {
  // TODO: fill form from Gherkin table
});
When('the admin clicks "Save"', () => {
  // TODO: click Save
});
Then('the modal is closed', () => {
  // TODO: assert modal gone
});
Then('the coupons table contains a row with:', (table) => {
  // TODO: assert table row matches data
});
