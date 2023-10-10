const THRESHOLD_FOR_REPRODUCTION = 3;
const THRESHOLD_FOR_UNDERPOPULATION = 2;
const THRESHOLD_FOR_OVERCROWDING = 3;
export const DEAD = 0;
export const ALIVE = 1;

type CellStatus = typeof DEAD | typeof ALIVE;
type Universe = CellStatus[][];

export function isTheCellAlive(cell: CellStatus): boolean {
    return cell === ALIVE;
}

export function createUniverse(rows: number, columns: number): Universe {
    return Array(rows).fill(Array(columns).fill(DEAD));
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

export function determineTheAmountOfAliveNeighbours(universe: Universe, row: number, col: number): number {
    const neighbours = extractNeighbours(universe, row, col);
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
        const amountOfAliveNeighbours = determineTheAmountOfAliveNeighbours(currentUniverse, rowIndex, columnIndex);
        return determineNextStatusOfCell(cell, amountOfAliveNeighbours);
    }));
}
