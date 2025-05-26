Feature: Impartial Signup Flow

  Scenario Outline: User completes signup from start to finish
    Given the user is on the signup page
    Then the "LET'S DO THIS" button is disabled
    When the user enters a valid email "<email>"
    Then the "LET'S DO THIS" button is enabled
    When the user clicks "LET'S DO THIS"
    Then the first name and last name fields are visible
    And the NEXT button on the name page is disabled
    When the user enters first name "<firstName>" and last name "<lastName>"
    Then the "NEXT" button is enabled
    When the user clicks "NEXT"
    Then the cell number field is visible
    And the NEXT button on the cell page is disabled
    When the user enters a valid cell number "<cellNumber>"
    Then the "NEXT" button is enabled
    When the user clicks "NEXT"
    Then the role selection radio buttons are visible
    And the NEXT button on the role page is disabled
    When the user selects role "<role>"
    Then the "NEXT" button is enabled
    When the user clicks "NEXT"
    Then the password and confirm-password fields are visible
    And the "CREATE" button is disabled
    When the user enters password "<password>" and confirms it
    And the user checks the terms and conditions box
    And the user completes the captcha verification
    Then the "CREATE" button is enabled
    When the user clicks "CREATE"
    Then the confirmation message is displayed
    When the user clicks "CONTINUE"
    Then the login page is displayed


  Examples:
    | email                       | firstName     | lastName | cellNumber   | role           | password         |
    | tikin97155@betzenn.com      | Hafiz         | Arslan   | 0123456789   | Contractor     | Your@Password123  |
