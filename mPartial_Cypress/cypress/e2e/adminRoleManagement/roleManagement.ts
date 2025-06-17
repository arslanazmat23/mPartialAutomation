import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the admin navigates to the Role Management page", () => {
  // TODO: navigate to /role-management
});
When('the admin clicks the "Add new user" button', () => {
  // TODO: click Add new user
});
Then('the "Add New User" modal is visible', () => {
  // TODO: assert modal appears
});
Then('the "Submit" button is disabled', () => {
  // TODO: assert Submit disabled
});

When('the admin fills:', (table) => {
  // TODO: fill user form
});
When('the admin clicks "Submit"', () => {
  // TODO: click Submit
});
Then('the modal closes', () => {
  // TODO: assert modal gone
});
Then('the Role Management table contains {string} with email {string}', (userName, email) => {
  // TODO: assert new row present
});

When('the admin clicks the "eye" icon next to {string}', (userName: string) => {
  // TODO: find row by userName and click eye
});
Then('the browser navigates to "/enable2FA/{string}"', (userName: string) => {
  // TODO: assert URL includes /enable2FA/userName
});
Then('the "Generate QR Code" button is visible', () => {
  // TODO: assert button appears
});
