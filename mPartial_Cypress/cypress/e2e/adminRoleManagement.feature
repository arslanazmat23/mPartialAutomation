Feature: Role Management
  In order to control who can access and manage the system
  As an admin user
  I want to add new users, cancel creation, verify creation, and enable security settings

  Background:
    Given I am logged in as an admin
    And I am on the Role Management page
 
  @skip
  @role
  Scenario: Open Add New User dialog
    When I click the "Add new user" button
    Then the Add New User dialog is displayed
    And the Submit button is disabled
  
  @skip
  @role
  Scenario: Cancel Add New User dialog
    Given the Add New User dialog is open
    When I click the close icon
    Then the dialog is hidden
    And no new user is added to the users table

  @role
  Scenario: Create a valid new user
    Given the Add New User dialog is open
    When I fill in the following fields:
      | Field        | Value             |
      | User Name    | newuser3          |
      | Display Name | New User One      |
      | Email        | new3@example.com  |
      | Password     | P@ssw0rd!         |
    And I click the Submit button
    Then the dialog is hidden
    And the users table includes a row with:
      | User Name | Email             |
      | newuser3  | new3@example.com  |
  
  @skip
  @role
  Scenario: Enable 2FA for an existing user
    Given I see user "arslan" in the users table
    When I click the view icon next to "arslan"
    Then I navigate to "/enable2FA/arslan"
    And the Generate QR Code button is visible
