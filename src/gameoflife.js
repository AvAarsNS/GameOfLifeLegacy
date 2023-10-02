const THRESHOLD_FOR_REPRODUCTION = 3;
const THRESHOLD_FOR_UNDERPOPULATION = 2;
const THRESHOLD_FOR_OVERCROWDING = 3;
export const DEAD = 0;
export const ALIVE = 1;

export function isTheCellAlive(cell) {
    return cell === ALIVE;
}

export function isCoordinateInUniverse(universe, row, col) {
    return row >= 0 && col >= 0 && row < universe.length && col < universe[0].length;
}

export function extractNeighbours(universe, row, col) {
    const neighborOffsets = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    return neighborOffsets.flatMap(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        return isCoordinateInUniverse(universe, newRow, newCol) ? [universe[newRow][newCol]] : [];
    });
}

export function determineTheAmountOfAliveNeighbours(universe, row, col) {
    const neighbours = extractNeighbours(universe, row, col);
    return neighbours.filter(isTheCellAlive).length;
}

export function determineIfThereIsUnderpopulation(aliveNeighbours) {
    return aliveNeighbours < THRESHOLD_FOR_UNDERPOPULATION;    
}

export function determineIfThereIsOvercrowding(aliveNeighbours) {
    return aliveNeighbours > THRESHOLD_FOR_OVERCROWDING;
}

export function determineNextStatusOfCell(cellStatus, aliveNeighbours) {
    if (isTheCellAlive(cellStatus)) {
        return shouldCellDie(aliveNeighbours);
    }
    return deadCellCanReproduce(aliveNeighbours);
}

export function deadCellCanReproduce(aliveNeighbours) {
    return aliveNeighbours === THRESHOLD_FOR_REPRODUCTION ? ALIVE : DEAD;
}

function shouldCellDie(aliveNeighbours) {
    if (determineIfThereIsUnderpopulation(aliveNeighbours) || determineIfThereIsOvercrowding(aliveNeighbours)) {
        return DEAD;
    }
    return ALIVE;
}

export function generateNextTick(currentUniverse) {
    return currentUniverse.map((row, rowIndex) => row.map((cell, columnIndex) => {
        const amountOfAliveNeighbours = determineTheAmountOfAliveNeighbours(currentUniverse, rowIndex, columnIndex);
        return determineNextStatusOfCell(cell, amountOfAliveNeighbours);
    }));
}