Feature: Admin Login

  Scenario: Successful Login with Valid Credentials
    Given the user is on the login page
    When the user enters a valid Username
    And the user enters the correct password
    And the user clicks the SIGN IN button
    Then the login should succeed and the Orders dashboard appears