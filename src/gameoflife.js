const thresholdForReproduction = 3;
export const DEAD = 0;
export const ALIVE = 1;

export function isTheCellAlive(cell) {
    return cell == ALIVE
}

export function determineTheAmountOfAliveNeighbours(universe, cellRow, cellColumn) {
    let numberOfNeiboursAlive = 0
    return numberOfNeiboursAlive = isThereANeighbourAliveOnTheRight(universe, cellRow, cellColumn) 
    + isThereANeighbourAliveOnTheLeft(universe, cellRow, cellColumn) 
    + isThereANeighbourAliveDownUnder(universe, cellRow, cellColumn)
    + isThereANeighbourAliveDownUnderToTheRight(universe, cellRow, cellColumn)
    + isThereANeighbourAliveAboveToTheLeft(universe, cellRow, cellColumn)
    + isThereANeighbourAliveDownUnderToTheLeft(universe, cellRow, cellColumn)
    + isThereANeighbourAliveAboveToTheRight(universe, cellRow, cellColumn)
    + isThereANeighbourAliveRightAbove(universe, cellRow, cellColumn)
}

export function isThereANeighbourAliveOnTheRight(universe, cellRow, cellColumn) {
    return universe[cellRow][cellColumn + 1] == ALIVE ? ALIVE : DEAD;
}

export function isThereANeighbourAliveOnTheLeft(universe, cellRow, cellColumn) {
    return universe[cellRow][cellColumn - 1] == ALIVE ? ALIVE : DEAD;
}

export function isThereANeighbourAliveDownUnder(universe, cellRow, cellColumn) {
    return doesTheUniverseContinueBelowThisRow(universe, cellRow) && universe[cellRow + 1][cellColumn] == ALIVE ? ALIVE : DEAD;
}

export function isThereANeighbourAliveDownUnderToTheRight(universe, cellRow, cellColumn) {
    return doesTheUniverseContinueBelowThisRow(universe, cellRow) && universe[cellRow + 1][cellColumn + 1] == ALIVE ? ALIVE : DEAD;
}

export function isThereANeighbourAliveDownUnderToTheLeft(universe, cellRow, cellColumn) {
    return doesTheUniverseContinueBelowThisRow(universe, cellRow) && universe[cellRow + 1][cellColumn - 1] == ALIVE ? ALIVE : DEAD;
}

export function isThereANeighbourAliveAboveToTheLeft(universe, cellRow, cellColumn) {
    return doesTheUniverseContinueAboveThisRow(cellRow) && universe[cellRow - 1][cellColumn - 1] == ALIVE ? ALIVE : DEAD;
}

export function isThereANeighbourAliveAboveToTheRight(universe, cellRow, cellColumn) {
    return doesTheUniverseContinueAboveThisRow(cellRow) && universe[cellRow - 1][cellColumn + 1] == ALIVE ? ALIVE : DEAD;
}

export function isThereANeighbourAliveRightAbove(universe, cellRow, cellColumn) {
    return doesTheUniverseContinueAboveThisRow(cellRow) && universe[cellRow - 1][cellColumn] == ALIVE ? ALIVE : DEAD;
}

export function doesTheUniverseContinueBelowThisRow(universe, cellRow){
    let cellRowInNormalNumbers = cellRow + 1
    return universe.length > cellRowInNormalNumbers
}

export function doesTheUniverseContinueAboveThisRow(cellRow) {
    return cellRow > 0
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