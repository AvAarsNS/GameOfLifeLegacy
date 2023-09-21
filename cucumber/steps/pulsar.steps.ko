import { loadFeature, defineFeature } from "jest-cucumber";
import { generateNextTick } from "../../src/gameoflife";

const feature = loadFeature("./cucumber/features/pulsar.feature");

defineFeature(feature, (test) => {
    test('Next pulsar generation', ({ given, and, when, then }) => {
        let universe;
        let nextUniverse;
        given(/^we have a universe of 15 by 15$/, (arg0, arg1) => {
            universe = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0]
            ];   
        });

        and('it contains pulsar', () => {
            universe[2][4] = 1;
            universe[2][5] = 1;
            universe[2][6] = 1;
            universe[2][10] = 1;
            universe[2][11] = 1;
            universe[2][12] = 1;
            universe[4][2] = 1;
            universe[4][7] = 1;
            universe[4][9] = 1;
            universe[4][14] = 1;
            universe[5][2] = 1;
            universe[5][7] = 1;
            universe[5][9] = 1;
            universe[5][14] = 1;
            universe[6][2] = 1;
            universe[6][7] = 1;
            universe[6][9] = 1;
            universe[6][14] = 1;
            universe[7][4] = 1;
            universe[7][5] = 1;
            universe[7][6] = 1;
            universe[7][10] = 1;
            universe[7][11] = 1;
            universe[7][12] = 1;
            universe[9][4] = 1;
            universe[9][5] = 1;
            universe[9][6] = 1;
            universe[9][10] = 1;
            universe[9][11] = 1;
            universe[9][12] = 1;
            universe[10][2] = 1;
            universe[10][7] = 1;
            universe[10][9] = 1;
            universe[10][14] = 1;
            universe[11][2] = 1;
            universe[11][7] = 1;
            universe[11][9] = 1;
            universe[11][14] = 1;
            universe[12][2] = 1;
            universe[12][7] = 1;
            universe[12][9] = 1;
            universe[12][14] = 1;
            universe[14][4] = 1;
            universe[14][5] = 1;
            universe[14][6] = 1;
            universe[14][10] = 1;
            universe[14][11] = 1;
            universe[14][12] = 1;

            console.log(universe);
        });

        when('the next tick is generated', () => {

        });

        then(/^it has evolved to a (\d+) by (\d+) universe with the next stage of the pulsar$/, (arg0, arg1) => {

        });
    });
});


