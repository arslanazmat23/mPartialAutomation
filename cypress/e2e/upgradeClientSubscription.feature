@e2e
@upgradeFlow
Feature: Buy mpartial Subscription
  In order to access the Enterprise tier features
  As an authenticated User
  I want to upgrade my membership to the Enterprise Plan

  Background: the user is logged in
    Given the user is logged in with a valid account

  
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
    And the User fills in payment card details:
      | Field           | Value               |
      | Name on card    | Demo                |
      | Card number     | 4242 4242 4242 4242 |
      | Expiration date | 12/34               |
      | CVC             | 123                 |
      | ZIP             | 90210               |
    And the User clicks the "Save" button in the Add Payment Option modal
    Then the Add Payment Option modal is hidden
    And a new card ending in "4242" is added to the Payment Method section
    And it is selected by default

  @skip
  @coupon
  Scenario Outline: Apply a valid coupon and update order summary
    Given the User is on the Checkout page with a payment card added
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

    Examples:
      | couponCode | percentageOff | duration | planPrice | discount | total  |
      | Coupon100  | 100           | 118      | $185.00   | $185.00  | $0.00  |
      | SPRING50   | 50            | 12       | $185.00   | $92.50   | $92.50 |

  @skip
  @complete
  Scenario: Complete checkout and navigate to Subscription Receipt
    Given the User is on the Checkout page with a valid coupon applied and payment card selected
    When the User clicks the "Checkout" button
    Then the URL should include "/subscriptionreceipt"
    And a receipt PDF download is triggered

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
      | product         | discountLabel                   | discountValue | paymentMethod | total   | startDate     | nextBillingDate | price   |
      | Enterprise Plan | Discount (Coupon100)            | -$185.00      | Credit Card   | $0.00   | June 26, 2025 | July 26, 2025   | $0.00   |
      | Enterprise Plan | Discount (SPRING50)             | -$92.50       | Credit Card   | $92.50  | June 26, 2025 | July 26, 2025   | $92.50  |
      | Enterprise Plan | Coupon Adjustment: (AUTOTEST10) | -$50.00       | Credit Card   | $135.00 | June 26, 2025 | July 26, 2025   | $135.00 |

  @skip
  @return
  Scenario: Return to My Account after receipt
    Given the User is on the Receipt page
    When the User clicks the "My Subscription" button
    Then the URL should include "/profile"
    And the Enterprise Plan card is visible on the My Account page
