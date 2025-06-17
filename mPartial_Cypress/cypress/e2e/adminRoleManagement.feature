Feature: Role Management

  Background: the admin user is logged in
    Given the admin user is logged in

  Background: the admin is on the Role Management page
    Given the admin navigates to the Role Management page

  @role
  Scenario: Open Add New User modal
    When the admin clicks the "Add new user" button
    Then the "Add New User" modal is visible
    And the "Submit" button is disabled

  @role
  Scenario: Cancel Add New User modal
    Given the "Add New User" modal is open
    When the admin clicks the "X" button
    Then the modal closes
    And no new user appears in the table

  @role
  Scenario: Create a valid new user
    Given the "Add New User" modal is open
    When the admin fills:
      | User Name    | newuser1      |
      | Display Name | New User One  |
      | Email        | new1@example.com |
      | Password     | P@ssw0rd!     |
    And the admin clicks "Submit"
    Then the modal closes
    And the Role Management table contains "newuser1" with email "new1@example.com"

  @role
  Scenario: Enable 2FA for existing user
    Given the admin sees user "arslan" in the table
    When the admin clicks the "eye" icon next to "arslan"
    Then the browser navigates to "/enable2FA/arslan"
    And the "Generate QR Code" button is visible
