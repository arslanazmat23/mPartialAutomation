Feature: Role Management
  In order to control who can access and manage the system
  As an admin user
  I want to add new users, cancel creation, verify creation, and enable security settings

  Background:
    Given User is logged in as an admin
    And User is on the Role Management page

  @skip
  @role
  Scenario: Open Add New User dialog
    When User click the "Add new user" button
    Then the Add New User dialog is displayed
    And the Submit button is enabled

  @skip
  @role
  Scenario: Cancel Add New User dialog
    Given the Add New User dialog is open
    When User click the close icon
    Then the dialog is hidden
    And no new user is added to the users table

  @skip
  Scenario: Create a valid new user
    Given the Add New User dialog is open
    When User fill in the following fields:
      | Field        | Value            |
      | User Name    | newuser3         |
      | Display Name | New User One     |
      | Email        | new3@example.com |
      | Password     | P@ssw0rd!        |
    And User click the Submit button
    Then the dialog is hidden
    And the users table includes a row with:
      | User Name | Email            |
      | newuser3  | new3@example.com |

  @role
  Scenario: Enable 2FA for an existing user
    Given User locate "arslan" in the users table
    When User click the view icon next to "arslan"
    Then User navigate to "/enable2FA/arslan"
    And the Generate QR Code button is visible
