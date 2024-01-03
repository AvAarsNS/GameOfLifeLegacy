import { loadFeature, defineFeature } from "jest-cucumber";
import { startNewGame } from "../../src/gameoflife";
import { startTheGame } from "../../src/api";

// Define your types
type CellStatus = 0 | 1;
type Universe = CellStatus[][];

const feature = loadFeature("./cucumber/features/random.feature");

defineFeature(feature, (test) => {
    test('Start new game with a random pattern', ({ given, and, when, then }) => {       
        let req;
        let res;
        given('an API consumer wants to play the Game of Life', () => {
            
        });

        and('the API consumer has selected the random pattern', () => {
            req = {
                body: {
                    height: 5,
                    width: 5,
                    pattern: 'random'
                }
            };
        });

        when('the POST start game is invoked', () => {
            res = startTheGame(req, res);
        });

        then('a response is returned', () => {
            expect(res).toBeDefined();
        });

        and(/^it contains a random universe at tick (\d+)$/, (arg0) => {
            // expect(universe).ToBe(5x5)
            // expect each cell to be 0 or 1
        });

        and(/^the HTTP status code is (\d+)$/, (arg0) => {

        });

        and('the content type is application/json', () => {

        });
    });
});
