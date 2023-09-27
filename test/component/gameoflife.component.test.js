import { determineTheAmountOfAliveNeighbours } from '../../src/gameoflife';

describe(`This is the component test suite for a finite version of Conways Game of Life.`, () => {
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
});
