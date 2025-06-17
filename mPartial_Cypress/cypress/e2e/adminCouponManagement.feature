Feature: Order Coupon Management

  Background: the admin user is logged in
    Given the admin user is logged in

  Background: the admin is on the Order Coupons page
    Given the admin navigates to the Order Coupons page

  @coupon
  Scenario: Open Create New Coupon modal
    When the admin clicks the "Create New Coupon" button
    Then the "Create New Coupon" modal is visible
    And the "Save" button is disabled

  @coupon
  Scenario: Cancel Create New Coupon modal
    Given the modal is open
    When the admin clicks the "X" button
    Then the modal is closed
    And no new coupon appears in the table

  @coupon
  Scenario: Create a valid percentage coupon
    Given the modal is open
    When the admin fills:
      | Coupon Code           | TESTPCT10                |
      | Product               | mpartialScope Xactimate   |
      | Coupon Type           | Percentage               |
      | Coupon Percentage     | 10                       |
      | Application Active    | today                    |
      | Application Expiration| tomorrow                 |
    And the admin clicks "Save"
    Then the modal is closed
    And the coupons table contains a row with:
      | Code              | TESTPCT10  |
      | Discount Amount / % | 10%        |

  @coupon
  Scenario: Duplicate coupon code validation
    Given the modal is open
    And a coupon with code "EXISTING10" already exists
    When the admin enters "EXISTING10" in "Coupon Code" and fills required fields
    And the admin clicks "Save"
    Then the inline error "Coupon code already in use" is shown
    And the modal remains open
