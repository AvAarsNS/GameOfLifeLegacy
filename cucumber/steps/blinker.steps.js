import { loadFeature, defineFeature } from "jest-cucumber";
import { generateNextTick } from "../../src/gameoflife";

const feature = loadFeature("./cucumber/features/blinker.feature");

defineFeature(feature, (test) => {
    test('Next blinker generation', ({ given, and, when, then }) => {
        let universe;
        let nextUniverse;
        given(/^we have a universe of 3 by 3$/, () => {
            universe = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];
        });

        and('it contains vertical blinker', () => {
            universe[0][1] = 1;
            universe[1][1] = 1;
            universe[2][1] = 1;
        });

        when('the next tick is generated', () => {
            nextUniverse = generateNextTick(universe);
        });

        then('it has evolved to a 3x3 universe with a horizontal blinker', () => {
            expect(nextUniverse).toEqual([
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ]);
        });
    });
});


