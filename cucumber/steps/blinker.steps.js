import { loadFeature, defineFeature } from "jest-cucumber";

const feature = loadFeature("./cucumber/features/blinker.feature");

defineFeature(feature, (test) => {
    test('Next blinker generation', ({ given, and, when, then }) => {
        given(/^we have a universe of (\d+) by (\d+)$/, (arg0, arg1) => {
const universe = [
    [0, 1, 0]
    [0, 1, 0]
    [0, 1, 0]
]
        });

        and('it contains vertical blinker', () => {

        });

        when('the next tick is generated', () => {

        });

        then('the blinker has evolved intto a horizontal line', () => {

        });

        and(/^the size of the universe is still (\d+) by (\d+)$/, (arg0, arg1) => {

        });
    });
});


