Feature: Admin Login

  Scenario: Successful Login with Valid Credentials
    Given the user is on the Admin login page
    When the user enters a valid Username
    And the user enters the Admin password
    And the Admin user clicks the SIGN IN button
    Then the login should succeed and the Orders dashboard appears
