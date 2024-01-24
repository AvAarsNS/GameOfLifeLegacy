import { CellStatus } from "../../src/gameoflife";

export const emptyUniverse: CellStatus[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

export const universeWithHorizontalBlinker: CellStatus[][] = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
];