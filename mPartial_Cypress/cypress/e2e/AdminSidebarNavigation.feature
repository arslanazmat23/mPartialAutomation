Feature: Admin Sidebar Navigation

  Background: the admin user is logged in
    Given the admin user is logged in

  @navigation
  Scenario: Navigate to Orders page
    When the admin clicks the "Orders" sidebar link
    Then the URL should include "/allorders"
    And the page heading reads "Orders"

  @navigation
  Scenario: Navigate to Customers page
    When the admin clicks the "Customers" sidebar link
    Then the URL should include "/user-management"
    And the page heading reads "Customers"

  @navigation
  Scenario: Navigate to Order Coupons page
    When the admin clicks the "Order Coupons" sidebar link
    Then the URL should include "/coupons"
    And the page heading reads "Order Coupons"

  @navigation
  Scenario: Navigate to Subscription Coupons page
    When the admin clicks the "Subscription Coupons" sidebar link
    Then the URL should include "/subscription_coupons"
    And the page heading reads "Coupons"

  @navigation
  Scenario: Navigate to View All Subscriptions page
    When the admin clicks the "View All Subscriptions" sidebar link
    Then the URL should include "/allsubscriptions"
    And the page heading reads "View All Subscriptions"

  @navigation
  Scenario: Navigate to Role Management page
    When the admin clicks the "Role Management" sidebar link
    Then the URL should include "/role-management"
    And the page heading reads "Role Management"
