import { Universe } from "../../src/gameoflife";

export const zeroNeighbours = 0;
export const oneNeighbour = 1;
export const twoNeighbours = 2;
export const threeNeighbours = 3;
export const moreThanThreeNeighbours = 4;
export const notThreeNeighbours = 4;
export const atLeastFourNeighbours = 4;
export const lessThanFourNeighbours = 3;

export const NO_CELLS_ALIVE = 0;

type Test = {
    render: string;
    universe: Universe;
    row: number;
    column: number;
}

export const TOP_LEFT = {
    row: 0,
    column: 0,
}

export const noAliveNeighbours: Test = {
    render: `
    → ▓|░|░
      -----
      ░|░|░`,
    universe: [[1,0,0],[0,0,0]],
    row: 0,
    column: 0,
};
export const threeByThreeUniverse = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];