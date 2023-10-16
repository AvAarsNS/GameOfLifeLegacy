import { loadFeature, defineFeature } from "jest-cucumber";
import { generateNextTick } from "../../src/gameoflife";

// Define your types
type CellStatus = 0 | 1;
type Universe = CellStatus[][];

const feature = loadFeature("./cucumber/features/glider.feature");

defineFeature(feature, (test) => {
    test('Next glider generation', ({ given, and, when, then }) => {
        let universe: Universe;
        let nextUniverse: Universe;

        given(/^we have a universe of (\d+) by (\d+)$/, (width: string, height: string) => {
            // use width and height if you need to generate a dynamic universe
            // for the sake of this example, a static universe is used
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

        then(/^it has evolved to a (\d+) by (\d+) universe with the next stage of the glider$/, (arg0: string, arg1: string) => {
            // use arg0 and arg1 if they are relevant to your then step
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
