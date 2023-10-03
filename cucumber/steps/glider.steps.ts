import { loadFeature, defineFeature } from "jest-cucumber";
import { generateNextTick } from "../../src/gameoflife";

const feature = loadFeature("./cucumber/features/glider.feature");

defineFeature(feature, (test) => {
    test('Next glider generation', ({ given, and, when, then }) => {
        let universe;
        let nextUniverse;
        given(/^we have a universe of (\d+) by (\d+)$/, (arg0, arg1) => {
            universe = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];
        });

        and('it contains a glider', () => {
            universe[0][0] = 1;
            universe[1][1] = 1;
            universe[1][2] = 1;
            universe[2][0] = 1;
            universe[2][1] = 1;
        });

        when('the next tick is generated', () => {
            nextUniverse = generateNextTick(universe);
        });

        then(/^it has evolved to a (\d+) by (\d+) universe with the next stage of the glider$/, (arg0, arg1) => {
            expect(nextUniverse).toEqual([
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ]);
        });
    });
});


