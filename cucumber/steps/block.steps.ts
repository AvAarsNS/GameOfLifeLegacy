import { loadFeature, defineFeature } from 'jest-cucumber';
import { generateNextTick } from '../../src/gameoflife';

// Define your types
type CellStatus = 0 | 1;
type Universe = CellStatus[][];

const feature = loadFeature('./cucumber/features/block.feature');

defineFeature(feature, (test) => {
    test('Next block generation', ({ given, and, when, then }) => {
        let universe: Universe;
        let nextUniverse: Universe;

        given(/^we have a universe of (\d+) by (\d+)$/, (width: string, height: string) => {
            // [width] and [height] can be utilized to dynamically generate the universe
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

        then(/^it has evolved to a (\d+) by (\d+) universe with block$/, (arg0: string, arg1: string) => {
            // [arg0] and [arg1] can be used if relevant to the scenario
            expect(nextUniverse).toEqual([
                [1, 1],
                [1, 1]
            ]);
        });
    });
});
