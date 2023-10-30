const THRESHOLD_FOR_REPRODUCTION = 3;
const THRESHOLD_FOR_UNDERPOPULATION = 2;
const THRESHOLD_FOR_OVERCROWDING = 3;
export const DEAD = 0;
export const ALIVE = 1;

export type CellStatus = typeof DEAD | typeof ALIVE;
export type Universe = CellStatus[][];

export function isTheCellAlive(cell: CellStatus): boolean {
    return cell === ALIVE;
}

export function createUniverse(rows: number, columns: number): Universe {
    return Array.from({ length: rows }, () => Array(columns).fill(DEAD));
}

export function isRowValid(universe: Universe, row: number): boolean {
    return row >= 0 && row < universe.length;
}

export function isColumnValid(universe: Universe, col: number): boolean {
    return col >= 0 && col < universe[0].length;
}

export function isCoordinateInUniverse(universe: Universe, row: number, col: number): boolean {
    return isRowValid(universe, row) && isColumnValid(universe, col);
}

export function extractNeighbours(universe: Universe, row: number, col: number): CellStatus[] {
    const neighbourOffsets: number[][] = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],   [1, 1]
    ];

    const neighbourCoordinates = neighbourOffsets
        .map(([rowOffset, colOffset]) => [row + rowOffset, col + colOffset]);

    const validNeighbourCoordinates = neighbourCoordinates
        .filter(([neighbourRow, neighbourCol]) => isCoordinateInUniverse(universe, neighbourRow, neighbourCol));

    const neighbouringCellValues = validNeighbourCoordinates
        .map(([neighbourRow, neighbourCol]) => universe[neighbourRow][neighbourCol]);

    return neighbouringCellValues;
}

export function determineTheAmountOfAliveNeighbours(neighbours: CellStatus[]): number {
    return neighbours.filter(isTheCellAlive).length;
}

export function determineIfThereIsUnderpopulation(aliveNeighbours: number): boolean {
    return aliveNeighbours < THRESHOLD_FOR_UNDERPOPULATION;    
}

export function determineIfThereIsOvercrowding(aliveNeighbours: number): boolean {
    return aliveNeighbours > THRESHOLD_FOR_OVERCROWDING;
}

export function determineNextStatusOfCell(cellStatus: CellStatus, aliveNeighbours: number): CellStatus {
    if (isTheCellAlive(cellStatus)) {
        return shouldCellDie(aliveNeighbours);
    }
    return deadCellCanReproduce(aliveNeighbours);
}

export function deadCellCanReproduce(aliveNeighbours: number): CellStatus {
    return aliveNeighbours === THRESHOLD_FOR_REPRODUCTION ? ALIVE : DEAD;
}

function shouldCellDie(aliveNeighbours: number): CellStatus {
    if (determineIfThereIsUnderpopulation(aliveNeighbours) || determineIfThereIsOvercrowding(aliveNeighbours)) {
        return DEAD;
    }
    return ALIVE;
}

export function generateNextTick(currentUniverse: Universe): Universe {
    return currentUniverse.map((row, rowIndex) => row.map((cell, columnIndex) => {
        const neighbours = extractNeighbours(currentUniverse, rowIndex, columnIndex);
        const amountOfAliveNeighbours = determineTheAmountOfAliveNeighbours(neighbours);
        return determineNextStatusOfCell(cell, amountOfAliveNeighbours);
    }));
}

export function startNewGame(height: number, width: number, pattern: PatternName): Universe {
    return addPatternToUniverse(createUniverse(height, width), pattern);
}

type PatternName = keyof typeof patternFunctions;

const patternFunctions = {
    glider: addGliderToUniverse,
    blinker: addBlinkerToUniverse,
    beehive: addBeehiveToUniverse,
};

export function addPatternToUniverse(
  universe: Universe,
  pattern: PatternName
): Universe {
  const patternFunction = patternFunctions[pattern];
    return patternFunction(universe);
}

export function addGliderToUniverse(universe: Universe): Universe {
    universe[0][1] = ALIVE;
    universe[1][2] = ALIVE;
    universe[2][0] = ALIVE;
    universe[2][1] = ALIVE;
    universe[2][2] = ALIVE;
    return universe;
}

export function addBlinkerToUniverse(universe: Universe): Universe {
    universe[1][0] = ALIVE;
    universe[1][1] = ALIVE;
    universe[1][2] = ALIVE;
    return universe;
}

export function addBeehiveToUniverse(universe: Universe): Universe {
    universe[0][1] = ALIVE;
    universe[0][2] = ALIVE;
    universe[1][0] = ALIVE;
    universe[1][3] = ALIVE;
    universe[2][1] = ALIVE;
    universe[2][2] = ALIVE;
    return universe;
}

export function addRandomDeadAndAliveCellsToUniverse(universe: Universe): Universe {
    const randomUniverse = universe.map(row => row.map(cell => {
        const random = Math.random();
        if (random > 0.5) {
            return ALIVE;
        }
        return DEAD;
    }));
    return randomUniverse;
}