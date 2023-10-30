"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBeehiveToUniverse = exports.addBlinkerToUniverse = exports.addGliderToUniverse = exports.addPatternToUniverse = exports.startNewGame = exports.generateNextTick = exports.deadCellCanReproduce = exports.determineNextStatusOfCell = exports.determineIfThereIsOvercrowding = exports.determineIfThereIsUnderpopulation = exports.determineTheAmountOfAliveNeighbours = exports.extractNeighbours = exports.isCoordinateInUniverse = exports.isColumnValid = exports.isRowValid = exports.createUniverse = exports.isTheCellAlive = exports.ALIVE = exports.DEAD = void 0;
var THRESHOLD_FOR_REPRODUCTION = 3;
var THRESHOLD_FOR_UNDERPOPULATION = 2;
var THRESHOLD_FOR_OVERCROWDING = 3;
exports.DEAD = 0;
exports.ALIVE = 1;
function isTheCellAlive(cell) {
    return cell === exports.ALIVE;
}
exports.isTheCellAlive = isTheCellAlive;
function createUniverse(rows, columns) {
    return Array.from({ length: rows }, function () { return Array(columns).fill(exports.DEAD); });
}
exports.createUniverse = createUniverse;
function isRowValid(universe, row) {
    return row >= 0 && row < universe.length;
}
exports.isRowValid = isRowValid;
function isColumnValid(universe, col) {
    return col >= 0 && col < universe[0].length;
}
exports.isColumnValid = isColumnValid;
function isCoordinateInUniverse(universe, row, col) {
    return isRowValid(universe, row) && isColumnValid(universe, col);
}
exports.isCoordinateInUniverse = isCoordinateInUniverse;
function extractNeighbours(universe, row, col) {
    var neighbourOffsets = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    var neighbourCoordinates = neighbourOffsets
        .map(function (_a) {
        var rowOffset = _a[0], colOffset = _a[1];
        return [row + rowOffset, col + colOffset];
    });
    var validNeighbourCoordinates = neighbourCoordinates
        .filter(function (_a) {
        var neighbourRow = _a[0], neighbourCol = _a[1];
        return isCoordinateInUniverse(universe, neighbourRow, neighbourCol);
    });
    var neighbouringCellValues = validNeighbourCoordinates
        .map(function (_a) {
        var neighbourRow = _a[0], neighbourCol = _a[1];
        return universe[neighbourRow][neighbourCol];
    });
    return neighbouringCellValues;
}
exports.extractNeighbours = extractNeighbours;
function determineTheAmountOfAliveNeighbours(neighbours) {
    return neighbours.filter(isTheCellAlive).length;
}
exports.determineTheAmountOfAliveNeighbours = determineTheAmountOfAliveNeighbours;
function determineIfThereIsUnderpopulation(aliveNeighbours) {
    return aliveNeighbours < THRESHOLD_FOR_UNDERPOPULATION;
}
exports.determineIfThereIsUnderpopulation = determineIfThereIsUnderpopulation;
function determineIfThereIsOvercrowding(aliveNeighbours) {
    return aliveNeighbours > THRESHOLD_FOR_OVERCROWDING;
}
exports.determineIfThereIsOvercrowding = determineIfThereIsOvercrowding;
function determineNextStatusOfCell(cellStatus, aliveNeighbours) {
    if (isTheCellAlive(cellStatus)) {
        return shouldCellDie(aliveNeighbours);
    }
    return deadCellCanReproduce(aliveNeighbours);
}
exports.determineNextStatusOfCell = determineNextStatusOfCell;
function deadCellCanReproduce(aliveNeighbours) {
    return aliveNeighbours === THRESHOLD_FOR_REPRODUCTION ? exports.ALIVE : exports.DEAD;
}
exports.deadCellCanReproduce = deadCellCanReproduce;
function shouldCellDie(aliveNeighbours) {
    if (determineIfThereIsUnderpopulation(aliveNeighbours) || determineIfThereIsOvercrowding(aliveNeighbours)) {
        return exports.DEAD;
    }
    return exports.ALIVE;
}
function generateNextTick(currentUniverse) {
    return currentUniverse.map(function (row, rowIndex) { return row.map(function (cell, columnIndex) {
        var neighbours = extractNeighbours(currentUniverse, rowIndex, columnIndex);
        var amountOfAliveNeighbours = determineTheAmountOfAliveNeighbours(neighbours);
        return determineNextStatusOfCell(cell, amountOfAliveNeighbours);
    }); });
}
exports.generateNextTick = generateNextTick;
function startNewGame(height, width, pattern) {
    return addPatternToUniverse(createUniverse(height, width), pattern);
}
exports.startNewGame = startNewGame;
var patternFunctions = {
    glider: addGliderToUniverse,
    blinker: addBlinkerToUniverse,
    beehive: addBeehiveToUniverse,
};
function addPatternToUniverse(universe, pattern) {
    var patternFunction = patternFunctions[pattern];
    return patternFunction(universe);
}
exports.addPatternToUniverse = addPatternToUniverse;
function addGliderToUniverse(universe) {
    universe[0][1] = exports.ALIVE;
    universe[1][2] = exports.ALIVE;
    universe[2][0] = exports.ALIVE;
    universe[2][1] = exports.ALIVE;
    universe[2][2] = exports.ALIVE;
    return universe;
}
exports.addGliderToUniverse = addGliderToUniverse;
function addBlinkerToUniverse(universe) {
    universe[1][0] = exports.ALIVE;
    universe[1][1] = exports.ALIVE;
    universe[1][2] = exports.ALIVE;
    return universe;
}
exports.addBlinkerToUniverse = addBlinkerToUniverse;
function addBeehiveToUniverse(universe) {
    universe[0][1] = exports.ALIVE;
    universe[0][2] = exports.ALIVE;
    universe[1][0] = exports.ALIVE;
    universe[1][3] = exports.ALIVE;
    universe[2][1] = exports.ALIVE;
    universe[2][2] = exports.ALIVE;
    return universe;
}
exports.addBeehiveToUniverse = addBeehiveToUniverse;
