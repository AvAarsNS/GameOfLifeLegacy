Feature: Glider

▓░░░░░░     ░▓░░░░░
░▓▓░░░░ >>  ░░▓░░░░
▓▓░░░░░     ▓▓▓░░░░
░░░░░░░     ░░░░░░░
░░░░░░░     ░░░░░░░

Scenario: Next glider generation
    Given we have a universe of 5 by 5
    And it contains a glider
    When the next tick is generated
    Then it has evolved to a 5 by 5 universe with the next stage of the glider