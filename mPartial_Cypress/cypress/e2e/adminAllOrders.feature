Feature: All Orders Tabs

  Background: the admin user is logged in
    Given the admin user is logged in 
    And the admin navigates to the All Orders page

  @orders-tabs
  Scenario: Default tab is mpartialScope - Xactimate
    Then the URL should include "/allorders"
    And the "mpartialScope - Xactimate" tab is active

  @orders-tabs
  Scenario: Switch to mpartialScope - Symbility tab
    When the admin clicks the "mpartialScope - Symbility" tab
    Then the "mpartialScope - Symbility" tab is active
    And the orders table header reads "mpartialScope - Symbility"

  @orders-tabs
  Scenario: Switch to mpartialConvert tab
    When the admin clicks the "mpartialConvert" tab
    Then the "mpartialConvert" tab is active
    And the orders table header reads "mpartialConvert"

  @orders-tabs
  Scenario: Table content changes between tabs
    When the admin notes the first row under "mpartialScope - Xactimate"
    And the admin clicks the "mpartialScope - Symbility" tab
    Then the first row under "Symbility" is different from Xactimate

  @orders-tabs
  Scenario: Pagination works on Xactimate tab
    When the admin clicks page "2" in the paginator
    Then the page '2' is selected in paginator
