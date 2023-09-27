const thresholdForReproduction = 3;
export const DEAD = 0;
export const ALIVE = 1;

export function isTheCellAlive(cell) {
    return cell == ALIVE
}

export function determineTheAmountOfAliveNeighbours(universe, cellRow, cellColumn) {
    var numberOfNeiboursAlive = 0
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
    return universe[cellRow][cellColumn + 1] == 1 ? 1 : 0;
}

export function isThereANeighbourAliveOnTheLeft(universe, cellRow, cellColumn) {
    return universe[cellRow][cellColumn - 1] == 1 ? 1 : 0;
}

export function isThereANeighbourAliveDownUnder(universe, cellRow, cellColumn) {
    return doesTheUniverseContinueBelowThisRow(universe, cellRow) && universe[cellRow + 1][cellColumn] == 1 ? 1 : 0;
}

export function isThereANeighbourAliveDownUnderToTheRight(universe, cellRow, cellColumn) {
    return doesTheUniverseContinueBelowThisRow(universe, cellRow) && universe[cellRow + 1][cellColumn + 1] == 1 ? 1 : 0;
}

export function isThereANeighbourAliveDownUnderToTheLeft(universe, cellRow, cellColumn) {
    return doesTheUniverseContinueBelowThisRow(universe, cellRow) && universe[cellRow + 1][cellColumn - 1] == 1 ? 1 : 0;
}

export function isThereANeighbourAliveAboveToTheLeft(universe, cellRow, cellColumn) {
    return doesTheUniverseContinueAboveThisRow(cellRow) && universe[cellRow - 1][cellColumn - 1] == 1 ? 1 : 0;
}

export function isThereANeighbourAliveAboveToTheRight(universe, cellRow, cellColumn) {
    return doesTheUniverseContinueAboveThisRow(cellRow) && universe[cellRow - 1][cellColumn + 1] == 1 ? 1 : 0;
}

export function isThereANeighbourAliveRightAbove(universe, cellRow, cellColumn) {
    return doesTheUniverseContinueAboveThisRow(cellRow) && universe[cellRow - 1][cellColumn] == 1 ? 1 : 0;
}

export function doesTheUniverseContinueBelowThisRow(universe, cellRow){
    var cellRowInNormalNumbers = cellRow + 1
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
// TODO: refactor this functionality. Suggestion: check beforehand if the cell is dead or alive and create seperate functions for each case.
export function determineNextStatusOfCell(cellStatus, aliveNeighbours) {
    if (cellStatus == ALIVE)
        return aliveCellCanLive(aliveNeighbours);
    return deadCellCanReproduce(aliveNeighbours);
}

function aliveCellCanLive(aliveNeighbours) {
    if (shouldCellDie(aliveNeighbours)) 
        return DEAD;
    return ALIVE;
}

export function deadCellCanReproduce(aliveNeighbours) {
    return aliveNeighbours == thresholdForReproduction ? ALIVE : DEAD;
}

function shouldCellDie(aliveNeighbours) {
    return determineIfThereIsUnderpopulation(aliveNeighbours) || determineIfThereIsOvercrowding(aliveNeighbours);
}

export function generateNextTick(currentUniverse) {
    return currentUniverse.map((row, rowIndex) => row.map((cell, columnIndex) => {
        const amountOfAliveNeighbours = determineTheAmountOfAliveNeighbours(currentUniverse, rowIndex, columnIndex);
        return determineNextStatusOfCell(cell, amountOfAliveNeighbours);
    }));
}