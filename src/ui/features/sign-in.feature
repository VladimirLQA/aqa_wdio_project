Feature: Sign in to Sales Portal

  Scenario: Successfully signed in to Sales Portal
    Given I open Sales Portal
    When I enter 'aqacourse@gmail.com' in 'Email input'
    When I enter 'password' in 'Pasword input'
    And I click on 'Login button'
    And I wait for page load
    Then I should be on 'Home page'