@e2e
@upgradeFlow
Feature: Buy mpartial Subscription
  In order to access the Enterprise tier features
  As an authenticated User
  I want to upgrade my membership to the Enterprise Plan

  Background: the user is logged in
    Given the user is logged in with a valid account

    And subscription creation is stubbed

  @upgrade
  Scenario: Navigate to the Upgrade Plan page
    Given the User is on the My Account page
    When the User clicks the "Upgrade Your Plan" button
    Then the URL should include "/upgrade-plan"
    And the Membership plan table is visible with "Proceed" under the Enterprise column

    When the User clicks the "Proceed" button under the Enterprise column
    Then the URL should include "/subscriptioncheckout/Enterprise%20Plan"
    And the Billing Details section is displayed
    And the "Checkout" button is disabled

    #Then the User is on the Checkout page
    And the User fills in billing details:
      | Field        | Value      |
      | Company Name | My Company |

    When the User clicks the "Apply Coupon" button
    Then the Apply Coupon modal is visible

    When the User enters coupon code "<couponCode>" and clicks "Apply"
    Then the Apply Coupon modal is hidden

    And the coupon summary displays:
      | Field          | Value               |
      | Coupon Applied | <couponCode>        |
      | Percentage OFF | <percentageOff>%    |
      | Duration       | <duration> Month(s) |

    And the Your Order table includes:
      | Product                           | Price       |
      | Enterprise Plan                   | <planPrice> |
      | Coupon Adjustment: (<couponCode>) | -<discount> |
      | Total                             | <total>     |

    When the User clicks and enable the "Checkout" button
    Then the URL should include "/subscriptionreceipt"

    When the User clicks the "Download Receipt" link
    Then a new browser tab opens with a URL containing "/receipt"

    Examples:
      | couponCode | percentageOff | duration | planPrice | discount | total |
      | Coupon100  | 100           | 118      | $185.00   | $185.00  | $0.00 |

  @skip
  @download
  Scenario: Download and view receipt in a new tab
    Given the User is on the Subscription Receipt page
    When the User clicks the "Download Receipt" link
    Then a new browser tab opens with a URL containing "/receipt"

  @skip
  @receipt
  Scenario Outline: Receipt page displays correct details for any coupon
    Given the User is on the Receipt page
    When the User views the Order Details table
    Then the Order Details table includes:
      | Product         | <product>       |
      | <discountLabel> | <discountValue> |
      | Payment Method  | <paymentMethod> |
      | Total           | <total>         |
    And the User views the Subscription Information table
    Then the Subscription Information table includes:
      | Start Date        | <startDate>       |
      | Next Billing Date | <nextBillingDate> |
      | Price/month       | <price>           |

    Examples:
      | product         | discountLabel        | discountValue | paymentMethod | total | startDate     | nextBillingDate | price |
      | Enterprise Plan | Discount (Coupon100) | -$185.00      | Credit Card   | $0.00 | June 26, 2025 | July 26, 2025   | $0.00 |

  @skip
  @return
  Scenario: Return to My Account after receipt
    Given the User is on the Receipt page
    When the User clicks the "My Subscription" button
    Then the URL should include "/profile"
    And the Enterprise Plan card is visible on the My Account page
