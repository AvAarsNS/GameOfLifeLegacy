const thresholdForReproduction = 3;
export const DEAD = 0;
export const ALIVE = 1;

export function isTheCellAlive(cell) {
    return cell == ALIVE
}

export function isThereANeighbourAlive(universe, row, col) {
    if (isCellInUniverse(row, col, universe)) {
        return universe[row][col] === ALIVE;
    }
    return false;
}

export function isCellInUniverse(row, col, universe) {
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
        return isCellInUniverse(newRow, newCol, universe) ? [universe[newRow][newCol]] : [];
    });
}


export function determineTheAmountOfAliveNeighbours(universe, row, col) {
    const neighbours = extractNeighbours(universe, row, col);
    return neighbours.filter(neighbour => neighbour === ALIVE).length;
}

export function determineIfThereIsUnderpopulation(aliveNeighbours) {
    return aliveNeighbours <= 1    
}

export function determineIfThereIsOvercrowding(aliveNeighbours) {
    return aliveNeighbours > 3
}
export function determineNextStatusOfCell(cellStatus, aliveNeighbours) {
    if (cellStatus == ALIVE)
        return shouldCellDie(aliveNeighbours);
    return deadCellCanReproduce(aliveNeighbours);
}

export function deadCellCanReproduce(aliveNeighbours) {
    return aliveNeighbours == thresholdForReproduction ? ALIVE : DEAD;
}

function shouldCellDie(aliveNeighbours) {
    if (determineIfThereIsUnderpopulation(aliveNeighbours) || determineIfThereIsOvercrowding(aliveNeighbours))
        return DEAD;
    return ALIVE;
}

export function generateNextTick(currentUniverse) {
    return currentUniverse.map((row, rowIndex) => row.map((cell, columnIndex) => {
        const amountOfAliveNeighbours = determineTheAmountOfAliveNeighbours(currentUniverse, rowIndex, columnIndex);
        return determineNextStatusOfCell(cell, amountOfAliveNeighbours);
    }));
}