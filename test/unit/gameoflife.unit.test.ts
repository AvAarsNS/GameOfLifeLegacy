import { threeByThreeUniverse } from "../doubles/stubs";

const {
  isTheCellAlive,
  determineIfThereIsUnderpopulation,
  deadCellCanReproduce,
  determineIfThereIsOvercrowding,
  ALIVE,
  DEAD,
  createUniverse,
  isRowValid,
  isColumnValid,
  isCoordinateInUniverse,
} = require("../../src/gameoflife");

const {
    zeroNeighbours,
    oneNeighbour,
    twoNeighbours,
    threeNeighbours,
    notThreeNeighbours,
    atLeastFourNeighbours,
    lessThanFourNeighbours
} = require('../doubles/stubs');

describe(`This is a test suite for a finite version of Conways Game of Life. 
    The rules of the game will be explained below. The goal of this finite version is to create the next Tick of the Universe.
    `, () => {
    describe(`One of the fundamental concepts in the Game of Life is a Cell. 
    A Cell can either be dead or alive. Both states are represented by using the images listed below.`, () => {
        it('░ -> dead cell', () => {
            expect(isTheCellAlive(DEAD)).toEqual(false);        
        });
        it('▓ -> alive cell', () => {
            expect(isTheCellAlive(ALIVE)).toEqual(true);        
        });
    });
    describe('Internally, the stat of a cell is denoted by a number', () => {
        it('An alive cell should be denoted by a 1', () => {
            expect(ALIVE).toEqual(1);
        });
        it('A dead cell should be denoted by a 0', () => {
            expect(DEAD).toEqual(0);
        });
    });
    // TODO: it seems that the tests below come from out of the blue. Seems like units are missing here.

    describe('The next concept is the Universe. The cells mentioned above sort of live in this universe. This is a square grid. We have a function that can initialize a universe, which..', () => {
        it('should create a universe with the specified number of rows and columns', () => {
            const rows = 3;
            const columns = 4;
            const universe = createUniverse(rows, columns);
            expect(universe.length).toEqual(rows);
            universe.forEach((row: string | any[]) => expect(row.length).toEqual(columns));
        });

        it('and should create a universe with all cells being dead', () => {
            const rows = 3;
            const columns = 4;
            const universe = createUniverse(rows, columns);
            universe.forEach((row: any[]) => row.forEach(cell => expect(cell).toEqual(0)));
        });
    });
    describe('Now that we have a universe, we need to eventually be able to determine how many alive neighbours a cell has, so that we can determine the next status of that cell', () => {
        describe('The first step in this process is finding a specific cell in the universe. This is done with coordinates. These need to be valid', () => {
            describe('We first check the coordinate for the row. This..', () => {
                const universe = threeByThreeUniverse;
                it('should return true for a valid row index', () => {
                    expect(isRowValid(universe, 0)).toEqual(true);
                    expect(isRowValid(universe, 1)).toEqual(true);
                    expect(isRowValid(universe, 2)).toEqual(true);
                });

                it('should return false for a negative row index', () => {
                    expect(isRowValid(universe, -1)).toEqual(false);
                });

                it('should return false for a row index greater than or equal to the number of rows in the universe', () => {
                    expect(isRowValid(universe, 3)).toEqual(false);
                    expect(isRowValid(universe, 4)).toEqual(false);
                });
            });
            describe('And then the column validation, which..', () => {
                const universe = threeByThreeUniverse;
                it('should return true for a valid column index', () => {
                    expect(isColumnValid(universe, 0)).toEqual(true);
                    expect(isColumnValid(universe, 1)).toEqual(true);
                });

                it('should return false for a negative column index', () => {
                    expect(isColumnValid(universe, -1)).toEqual(false);
                });

                it('should return false for a column index greater than or equal to the number of columns in the universe', () => {
                    expect(isColumnValid(universe, 2)).toEqual(true);
                    expect(isColumnValid(universe, 3)).toEqual(false);
                });
            });
            describe("Then we check both coordinates", () => {
                const universe = threeByThreeUniverse

                it("should return true for a coordinate within the bounds of the universe", () => {
                expect(isCoordinateInUniverse(universe, 0, 0)).toBe(true);
                expect(isCoordinateInUniverse(universe, 1, 1)).toBe(true);
                expect(isCoordinateInUniverse(universe, 2, 2)).toBe(true);
                });

                it("should return false for a coordinate outside the bounds of the universe", () => {
                expect(isCoordinateInUniverse(universe, -1, 0)).toBe(false);
                expect(isCoordinateInUniverse(universe, 0, -1)).toBe(false);
                expect(isCoordinateInUniverse(universe, 3, 0)).toBe(false);
                expect(isCoordinateInUniverse(universe, 0, 3)).toBe(false);
                });
            });
        });
    });
    describe(`
    Now that we know how many alive neighbours a cell has, we can introduce 2 important concepts:
    - Underpopulation
    - Reproduction
    - Overcrowding`, () => {
        describe('Underpopulation causes a cell to die. This occurs when', () => {
            it('a cell has 0 alive neighbours', () => {
                expect(determineIfThereIsUnderpopulation(zeroNeighbours)).toEqual(true)
            });
            it('or 1 alive neighbour', () => {
                expect(determineIfThereIsUnderpopulation(oneNeighbour)).toEqual(true)
            });
            it('but not when a cell has at least 2 alive neighbours', () => {
                expect(determineIfThereIsUnderpopulation(twoNeighbours)).toEqual(false)
            });

        });    
        describe(`On the other hand, reproduction causes a cell to become alive. This only happens when`, () => {
            it('exactly 3 neighbours are alive', () => {
                expect(deadCellCanReproduce(threeNeighbours)).toEqual(ALIVE);
            });
            it('and not when there are e.g. 4 cells alive', () => {
                expect(deadCellCanReproduce(notThreeNeighbours)).toEqual(DEAD);
            });
        });    
        describe('And lastly we have overcrowding, which also leads to the death of a cell. This happens when', () => {
            it('there are 4 (or more) alive neighbours', () => {
                expect(determineIfThereIsOvercrowding(atLeastFourNeighbours)).toEqual(true)
            });
            it('and not when there are less than 4 (e.g. 3)', () => {
                expect(determineIfThereIsOvercrowding(lessThanFourNeighbours)).toEqual(false)
            });
        });
    });
});