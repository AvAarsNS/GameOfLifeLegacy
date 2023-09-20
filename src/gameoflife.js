export function isTheCellAlive(cell) {
    return cell == 1 
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

export function isThereANeighbourAliveOnTheRight(universe, cellRow, cellColumn){
    if (universe[cellRow][cellColumn + 1] == 1){
        return 1
    } else return 0
}

export function isThereANeighbourAliveOnTheLeft(universe, cellRow, cellColumn) {
    if (universe[cellRow][cellColumn - 1] == 1) {
        return 1
    } else return 0
}

export function isThereANeighbourAliveDownUnder(universe, cellRow, cellColumn) {
    if (doesTheUniverseContinueBelowThisRow(universe, cellRow)){
        if (universe[cellRow + 1][cellColumn] == 1) {
            return 1
        } else return 0
    } return 0
}

export function isThereANeighbourAliveDownUnderToTheRight(universe, cellRow, cellColumn) {
    if (doesTheUniverseContinueBelowThisRow(universe, cellRow)) {
        if (universe[cellRow + 1][cellColumn + 1] == 1) {
            return 1
        } else return 0
    } return 0
}

export function isThereANeighbourAliveDownUnderToTheLeft(universe, cellRow, cellColumn) {
    if (doesTheUniverseContinueBelowThisRow(universe, cellRow)) {
        if (universe[cellRow + 1][cellColumn - 1] == 1) {
            return 1
        } else return 0
    } return 0
}

export function isThereANeighbourAliveAboveToTheLeft(universe, cellRow, cellColumn) {
    if (doesTheUniverseContinueAboveThisRow(cellRow)) {
        if (universe[cellRow - 1][cellColumn - 1] == 1) {
            return 1
        } else return 0
    } return 0
}

export function isThereANeighbourAliveAboveToTheRight(universe, cellRow, cellColumn) {
    if (doesTheUniverseContinueAboveThisRow(cellRow)) {
        if (universe[cellRow - 1][cellColumn + 1] == 1) {
            return 1
        } else return 0
    } return 0
}

export function isThereANeighbourAliveRightAbove(universe, cellRow, cellColumn) {
    if (doesTheUniverseContinueAboveThisRow(cellRow)) {
        if (universe[cellRow - 1][cellColumn] == 1) {
            return 1
        } else return 0
    } return 0
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

export function determineIfThereIsReproduction(aliveNeighbours) {
    return aliveNeighbours == 3
}

export function determineIfThereIsOvercrowding(aliveNeighbours) {
    return aliveNeighbours > 3
}

export function determineNextStatusOfCell(cellStatus, aliveNeighbours) {
    if (aliveNeighbours == 2){
        return cellStatus
    } if (determineIfThereIsUnderpopulation(aliveNeighbours) || determineIfThereIsOvercrowding(aliveNeighbours)) {
        return 0
    } else return 1
}

export  function generateNextTick(currentUniverse) {
    return currentUniverse.map((row, rowIndex) => row.map((cell, columnIndex) => {
        const amountOfAliveNeighbours = determineTheAmountOfAliveNeighbours(currentUniverse, rowIndex, columnIndex);
        return determineNextStatusOfCell(cell, amountOfAliveNeighbours);
    }));
}