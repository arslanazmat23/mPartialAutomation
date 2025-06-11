Feature: Site-wide navigation

  Background: the user is logged in
    Given the user is logged in

  # Header links
  Scenario: Navigate to Home via mpartialScope link
    When the user clicks the "mpartialScope" header link
    Then the URL should include "/mpartialScope"
    And the landing page shows "Choose your estimating software"

  Scenario: Navigate to About page
    When the user clicks the "About" header link
    Then the URL should include "/about"
    And the page heading reads "About mpartial"

  Scenario: Navigate to Contact Us page
    When the user clicks the "Contact Us" header link
    Then the URL should include "/#contact"
    And the Contact form is visible

  # Estimating software workflow
  Scenario: Start Xactimate estimating workflow
    Given the user is on the estimating software chooser
    When the user clicks the "Continue with Xactimate" button
    Then the URL should include "/order"

  # Account / Profile navigation
  Scenario: Open My Account page
    When the user opens the user menu and clicks "My Account"
    Then the URL should include "/profile"
    And the page heading reads "My Account"

  Scenario: Switch to Payment Options tab
    Given the user is on the My Account page
    When the user clicks the "Payment Options" tab
    Then the "Payment Options" section is displayed

  Scenario: Switch to Membership tab
    Given the user is on the My Account page
    When the user clicks the "Membership" tab
    Then the "Membership" section is displayed

  Scenario: Navigate to Manage Users page
    Given the user is on the My Account page
    When the user clicks the "Manage Users" button
    Then the URL should include "/manage_users"
    And the page heading reads "Manage Users"

  Scenario: Open Change Password modal
    Given the user is on the My Account page
    When the user clicks the "Change Password" button
    Then the Update Password modal is visible
