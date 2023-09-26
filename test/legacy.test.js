const {
    isTheCellAlive,
    determineTheAmountOfAliveNeighbours, 
    determineIfThereIsUnderpopulation, 
    determineIfThereIsReproduction, 
    determineIfThereIsOvercrowding,
    determineNextStatusOfCell
} = require('../src/gameoflife');

describe(`This is a test suite for a finite version of Conways Game of Life. 
    The rules of the game will be explained below. The goal of this finite version is to create the next Tick of the Universe.
    `, () => {
    describe(`One of the fundamental concepts in the Game of Life is a Cell. 
    A Cell can either be dead or alive. Both states are represented by using the images listed below.`, () => {
        it('░ -> dead cell', () => {
            expect(isTheCellAlive(0)).toEqual(false);        
        });
        it('▓ -> alive cell', () => {
            expect(isTheCellAlive(1)).toEqual(true);        
        });
    });

    describe(`
    A Tick causes the Universe to proceed to its next state, in which cells can die or become alive.
        To determine the next state of a cell, we first need to know how many alive neighbouring cells it has.`, () => {
        describe('For the sake of simplicity, When our universe consists of 1 row..', () => {
            
            it('░░░ the first cell has no alive neighbours', () => {
                expect(determineTheAmountOfAliveNeighbours([[0,0,0]],0,0)).toEqual(0);
            });
            it('░▓░ the first cell has one alive neighbours', () => {
                expect(determineTheAmountOfAliveNeighbours([[0, 1, 0]],0,0)).toEqual(1);
            });
            it('▓▓▓ the second cell has two alive neighbours', () => {
                expect(determineTheAmountOfAliveNeighbours([[1, 1, 1]],0,1)).toEqual(2);
            });
        });
        describe(`And when our universe consists of multiple rows`, () => {
            it(`
            → ▓░░
              ░░░ this cell has no alive neighbours`, () => {
                expect(determineTheAmountOfAliveNeighbours([[1,0,0],[0,0,0]],0,0)).toEqual(0)
            });
            it(`
            → ▓▓░
              ▓▓░ this cell has 3 alive neighbours`, () => {
                expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 0, 0)).toEqual(3)
            });
            it(`
              ▓▓░
              ▓▓░
                ↑ this cell has 2 alive neighbours`, () => {
                expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 1, 2)).toEqual(2)
            });
            it(`
             ↓
            ▓▓░
            ▓▓░  this one has 3 alive neighbours`, () => {
                expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 0, 1)).toEqual(3)
            });
            it(`
            ▓▓░
            ▓▓░ 
            ↑    the first cell on the second row has 3 alive neighbours`, () => {
                expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 1, 0)).toEqual(3)
            });
            it(`
            ▓▓▓
            ▓▓▓
            ▓▓▓ the middle cell has 8 alive neighbours`, () => {
                expect(determineTheAmountOfAliveNeighbours([[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, 1)).toEqual(8)
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
                expect(determineIfThereIsUnderpopulation(0)).toEqual(true)
            });
            it('or 1 alive neighbour', () => {
                expect(determineIfThereIsUnderpopulation(1)).toEqual(true)
            });
            it('but not when a cell has at least 2 alive neighbours', () => {
                expect(determineIfThereIsUnderpopulation(2)).toEqual(false)
            });

        });    
        describe(`On the other hand, reproduction causes a cell to become alive. This only happens when`, () => {
            it('exactly 3 neighbours are alive', () => {
                expect(determineIfThereIsReproduction(3)).toEqual(true)
            });
            it('and not when there are e.g. 4 cells alive', () => {
                expect(determineIfThereIsReproduction(4)).toEqual(false)
            });
        });    
        describe('And lastly we have overcrowding, which also leads to the death of a cell. This happens when', () => {
            it('there are 4 (or more) alive neighbours', () => {
                expect(determineIfThereIsOvercrowding(4)).toEqual(true)
            });
            it('and not when there are less than 4 (e.g. 3)', () => {
                expect(determineIfThereIsOvercrowding(3)).toEqual(false)
            });
        });
        describe(`Bringing these concepts together, we can determine the state of a cell in the next tick.`, () => {
            describe(`Looking at one specific cell that is alive, it will`, () => {
                it('die when it only has 1 alive neighbour, because of underpopulation', () => {
                    expect(determineNextStatusOfCell(1,1)).toEqual(0)
                });
                it('stay alive when it has 2 because a there is a stable environment', () => {
                    expect(determineNextStatusOfCell(1,2)).toEqual(1)
                });
                it('also stay alive when there are 3, because of reproduction', () => {
                    expect(determineNextStatusOfCell(1,3)).toEqual(1)
                });
                it('die with 4 neighbours, by overpopulation', () => {
                    expect(determineNextStatusOfCell(1,4)).toEqual(0)
                });
            });
            describe('When a cell is dead, it will', () => {
                it('stay dead when it only has 1 living neighbour, because of underpopulation', () => {
                    expect(determineNextStatusOfCell(0, 1)).toEqual(0)
                });
                it('also stay dead when there are 2, because a there is a stable environment', () => {
                    expect(determineNextStatusOfCell(0, 2)).toEqual(0)
                });
                it('become alive because of reproduction when there are 3 jolly neighbours', () => {
                    expect(determineNextStatusOfCell(0, 3)).toEqual(1)
                });
                it('stay dead because of overpopulation when there are 4', () => {
                    expect(determineNextStatusOfCell(0, 4)).toEqual(0)
                });
            });
        });
    });
});