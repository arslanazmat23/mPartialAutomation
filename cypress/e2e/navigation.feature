Feature: Site-wide navigation
  In order to access all areas of the site quickly
  As a logged-in user
  I want to navigate via header links, workflows, and my account menu

  Background: the user is logged in
    Given the user is logged in

  @navigation
  @header
  Scenario: Navigate to Home via mpartialScope link
    When the user navigate the "mpartialScope" header link
    Then the URL should include "/mpartialScope"
    And the landing page shows "Choose your estimating software"

  @navigation
  @header
  Scenario: Navigate to About page
    When the user navigate the "About" header link
    Then the URL should include "/about"
    And the page heading reads "About mpartial"

  @navigation
  @header
  Scenario: Navigate to Contact Us page
    When the user navigate the "Contact Us" header link
    Then the URL should include "/#contact"
    And the Contact form is visible

  @workflow
  @estimating
  Scenario: Start Xactimate estimating workflow
    Given the user is on the estimating software chooser
    When the user navigate the "Continue with Xactimate" button
    Then the URL should include "/order"

  @navigation
  @account
  Scenario: Open My Account page
    When the user opens the user menu and navigate "My Account"
    Then the URL should include "/profile"
    And the page heading reads "My Account"

  @navigation
  @account
  Scenario: Switch to Payment Options tab
    Given the user is on the My Account page
    When the user navigate the "Payment Options" tab
    Then the "Payment Options" section is displayed

  @navigation
  @account
  Scenario: Switch to Membership tab
    Given the user is on the My Account page
    When the user navigate the "Membership" tab
    Then the "Membership" section is displayed

  @navigation
  @account
  Scenario: Navigate to Manage Users page
    Given the user is on the My Account page
    When the user navigate the "Manage Users" button
    Then the URL should include "/manage_users"
    And the page heading reads "Manage Users"

  @navigation
  @account
  Scenario: Open Change Password modal
    Given the user is on the My Account page
    When the user navigate the "Change Password" button
    Then the Update Password modal is visible
