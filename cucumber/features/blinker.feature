Feature: Blinker

░▓░    ░░░
░▓░ -> ▓▓▓
░▓░    ░░░
Scenario: Next blinker generation
    Given we have a universe of 3 by 3
    And it contains vertical blinker
    When the next tick is generated
    Then it has evolved to a 3x3 universe with a horizontal blinker