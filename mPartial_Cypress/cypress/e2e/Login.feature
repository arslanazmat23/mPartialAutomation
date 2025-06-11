Feature: Login Functionality

  Scenario: Successful Login with Valid Credentials
    Given the user is on the login page
    When the user enters a valid email address
    And the user enters the correct password
    And the user clicks the SIGN IN button
    Then the user should be logged in successfully
    And the user should be redirected to the dashboard