import { loadFeature, defineFeature } from "jest-cucumber";
import { generateNextTick } from "../../src/gameoflife";

const feature = loadFeature("./cucumber/features/block.feature");

defineFeature(feature, (test) => {
    test('Next block generation', ({ given, and, when, then }) => {
        let universe;
        let nextUniverse;
        given(/^we have a universe of 2 by 2$/, (arg0, arg1) => {
            universe = [
                [0, 0],
                [0, 0]
            ];
        });

        and('it contains block', () => {
            universe[0][0] = 1;
            universe[0][1] = 1;
            universe[1][0] = 1;
            universe[1][1] = 1;
        });

        when('the next tick is generated', () => {
            nextUniverse = generateNextTick(universe);
        });

        then(/^it has evolved to a (\d+) by (\d+) universe with block$/, (arg0, arg1) => {
            expect(nextUniverse).toEqual([
                [1, 1],
                [1, 1]
            ]);
        });
    });
});


