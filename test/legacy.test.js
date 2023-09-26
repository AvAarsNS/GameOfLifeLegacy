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
            ▓░░
            ░░░ the top left cell has no alive neighbours`, () => {
                expect(determineTheAmountOfAliveNeighbours([[1,0,0],[0,0,0]],0,0)).toEqual(0)
            });
            it(`
            ▓▓░
            ▓▓░ the top left cell has 3 alive neighbours`, () => {
                expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 0, 0)).toEqual(3)
            });
            it(`
            ▓▓░
            ▓▓░ the 3rd cell on the 2nd row has 2 alive neighbours`, () => {
                expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 1, 2)).toEqual(2)
            });
            it(`
            ▓▓░
            ▓▓░ the second cell on the first row has 3 alive neighbours`, () => {
                expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 0, 1)).toEqual(3)
            });
            it(`
            ▓▓░
            ▓▓░ the first cell on the second row has 3 alive neighbours`, () => {
                expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 1, 0)).toEqual(3)
            });
            it(`
            ▓▓▓
            ▓▓▓
            ▓▓▓ the second cell on the second row has 8 alive neighbours`, () => {
                expect(determineTheAmountOfAliveNeighbours([[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, 1)).toEqual(8)
            });
        });
    });

    describe('We want to be able to determine if a cell can survive based on the amount of alive neighbours', () => {
        describe('When there are less than 2 alive neighbours there is underpopulation, leading to the cell to die:', () => {
            it('1 -> yes', () => {
                expect(determineIfThereIsUnderpopulation(1)).toEqual(true)
            });
            it('2 -> no', () => {
                expect(determineIfThereIsUnderpopulation(2)).toEqual(false)
            });

        });    
        describe('When there are exactly 3 alive neighbours there is reproduction:', () => {
            it('2 -> no', () => {
                expect(determineIfThereIsReproduction(2)).toEqual(false)
            });
            it('3 -> yes', () => {
                expect(determineIfThereIsReproduction(3)).toEqual(true)
            });
            it('4 -> no', () => {
                expect(determineIfThereIsReproduction(4)).toEqual(false)
            });
        });    
        describe('When there are more than 3 alive neighbours there is overcrowding:', () => {
            it('3 -> no', () => {
                expect(determineIfThereIsOvercrowding(3)).toEqual(false)
            });
            it('4 -> yes', () => {
                expect(determineIfThereIsOvercrowding(4)).toEqual(true)
            });
        });
        describe('When the cell is alive', () => {
            it('1 neighbour, it dies because of underpopulation', () => {
                expect(determineNextStatusOfCell(1,1)).toEqual(0)
            });
            it('2 neighbours, it stays alive because a there is a stable environment', () => {
                expect(determineNextStatusOfCell(1,2)).toEqual(1)
            });
            it('3 neighbours, it stays alive because of reproduction', () => {
                expect(determineNextStatusOfCell(1,3)).toEqual(1)
            });
            it('4 neighbours, it dies because of overpopulation', () => {
                expect(determineNextStatusOfCell(1,4)).toEqual(0)
            });
        });
        describe('When the cell is dead', () => {
            it('1 neighbour, it stays dead because of underpopulation', () => {
                expect(determineNextStatusOfCell(0, 1)).toEqual(0)
            });
            it('2 neighbours, it stays dead because a there is a stable environment', () => {
                expect(determineNextStatusOfCell(0, 2)).toEqual(0)
            });
            it('3 neighbours, it becomes alive because of reproduction', () => {
                expect(determineNextStatusOfCell(0, 3)).toEqual(1)
            });
            it('4 neighbours, it stays dead because of overpopulation', () => {
                expect(determineNextStatusOfCell(0, 4)).toEqual(0)
            });
        });
    });
});