Feature: Blinker

░▓░    ░░░
░▓░ -> ▓▓▓
░▓░    ░░░
Scenario: Next blinker generation
    Given we have a universe of 3 by 3
    And it contains vertical blinker
    When the next tick is generated
    Then the blinker has evolved intto a horizontal line
    And the size of the universe is still 3 by 3