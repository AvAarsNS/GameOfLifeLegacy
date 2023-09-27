const {
    isTheCellAlive,
    determineIfThereIsUnderpopulation, 
    deadCellCanReproduce, 
    determineIfThereIsOvercrowding,
    ALIVE,
    DEAD,
} = require('../../src/gameoflife');

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
    describe('Internally, the stat of a cell is denoted by a number', () => {
        it('An alive cell should be denoted by a 1', () => {
            expect(ALIVE).toEqual(1);
        });
        it('A dead cell should be denoted by a 0', () => {
            expect(DEAD).toEqual(0);
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
                expect(deadCellCanReproduce(3)).toEqual(ALIVE);
            });
            it('and not when there are e.g. 4 cells alive', () => {
                expect(deadCellCanReproduce(4)).toEqual(DEAD);
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
    });
});