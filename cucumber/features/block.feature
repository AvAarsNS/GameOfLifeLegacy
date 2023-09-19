Feature: Block

▓▓ --> ▓▓
▓▓ --> ▓▓
    Scenario: Next block generation
        Given we have a universe of 2 by 2
        And it contains block
        When the next tick is generated
        Then it has evolved to a 2 by 2 universe with block