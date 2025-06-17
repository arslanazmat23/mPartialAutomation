import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the admin navigates to the All Orders page", () => {
  // TODO: navigate to /allorders
});

Then('the "mpartialScope - Xactimate" tab is active', () => {
  // TODO: assert Xactimate tab active
});
When('the admin clicks the "mpartialScope - Symbility" tab', () => {
  // TODO: click Symbility tab
});
Then('the "mpartialScope - Symbility" tab is active', () => {
  // TODO: assert Symbility tab active
});
Then('the orders table header reads "mpartialScope - Symbility"', () => {
  // TODO: assert table header text
});

When('the admin clicks the "mpartialConvert" tab', () => {
  // TODO: click Convert tab
});
Then('the "mpartialConvert" tab is active', () => {
  // TODO: assert Convert tab active
});
Then('the orders table header reads "mpartialConvert"', () => {
  // TODO: assert table header text
});

When('the admin notes the first row under "mpartialScope - Xactimate"', () => {
  // TODO: save first row value
});
When('the admin clicks the "mpartialScope - Symbility" tab', () => {
  // TODO: click Symbility tab
});
Then('the first row under "Symbility" is different from Xactimate', () => {
  // TODO: compare saved value
});

When('the admin clicks page "2" in the paginator', () => {
  // TODO: click paginator page 2
});
Then('the table shows page "2" rows', () => {
  // TODO: assert table updated
});