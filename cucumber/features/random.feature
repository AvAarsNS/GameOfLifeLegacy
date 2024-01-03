Feature: Random
    Make it possible to start a new game with a random pattern

    Scenario: Start new game with a random pattern
        Given an API consumer wants to play the Game of Life
        And the API consumer has selected the random pattern
        When the POST start game is invoked
        Then a response is returned
        And it contains a random universe at tick 0
        And the HTTP status code is 200
        And the content type is application/json