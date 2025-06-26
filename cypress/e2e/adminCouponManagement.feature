Feature: Manage Order Coupons
  In order to offer promotional discounts on orders
  As an admin user
  I want to create, view, and validate order coupons

  Background:
    Given User is logged in as an admin
    And User is on the Order Coupons page

  @coupon
  Scenario: Open the Create Coupon dialog
    When User click the Create New Coupon button
    Then the Create Coupon dialog is displayed
    And the Save button is disabled

  @coupon
  Scenario: Cancel coupon creation
    Given the Create Coupon dialog is open
    When User click the Close icon
    Then the dialog is hidden
    And no coupon is added to the coupons list

  @coupon
  Scenario: Create a valid percentage coupon
    Given the Create Coupon dialog is open

    When User enter the following text fields:
      | Field                      | Value      |
      | Coupon Code                | Coupon101  |
      | Coupon Percentage          | 10         |
      | Application Active         | 06/24/2025 |
      | Application Expiration     | 06/25/2025 |
      | Number of Customers        | 15         |
      | Application limit per user | 3          |

    And User choose from the following dropdowns:
      | Field       | Option                  |
      | Product     | mpartialScope Xactimate |
      | Coupon Type | Percentage              |
      | Coupon For  | Public                  |

    And User click Save

    Then the Create Coupon dialog is hidden
    And the coupons table shows:
      | Code      | Discount |
      | Coupon101 | 10%      |

  @coupon
  Scenario: Prevent duplicate coupon codes
    Given the Create Coupon dialog is open
    And a coupon with code "Coupon101" already exists

    When User enter "Coupon101" as the Coupon Code
    And User fill in all other required fields with valid values
    And User click Save

    Then User see the inline error "Coupon101 is already existed"
    And the dialog remains open
