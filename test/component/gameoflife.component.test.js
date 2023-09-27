import { determineTheAmountOfAliveNeighbours,
        determineNextStatusOfCell } 
        from '../../src/gameoflife';

describe(`This is the component test suite for a finite version of Conways Game of Life.
    The components in this suite all revolve around the functionality of a Tick. Which causes a Universe to proceed to its next state.
    In this next state, the status of a cell can change. A cell can remain unchanged, die or become alive.`, () => {
    describe(`To determine the next state of a cell, we first need to know how many alive neighbouring cells it has.`, () => {
            describe('For the sake of simplicity, When our universe consists of 1 row..', () => {
                
                it(`░|░|░ the first cell has no alive neighbours
                `, () => {
                    expect(determineTheAmountOfAliveNeighbours([[0,0,0]],0,0)).toEqual(0);
                });
                it(`░|▓|░ the first cell has one alive neighbour
                `, () => {
                    expect(determineTheAmountOfAliveNeighbours([[0, 1, 0]],0,0)).toEqual(1);
                });
                it(`▓|▓|▓ the second cell has two alive neighbours
                `, () => {
                    expect(determineTheAmountOfAliveNeighbours([[1, 1, 1]],0,1)).toEqual(2);
                });
            });
            describe(`And when our universe consists of multiple rows`, () => {
                it(`
        → ▓|░|░
          -----
          ░|░|░ this cell has no alive neighbours`, () => {
                    expect(determineTheAmountOfAliveNeighbours([[1,0,0],[0,0,0]],0,0)).toEqual(0)
                });
                it(`
        → ▓|▓|░
          -----
          ▓|▓|░ this cell has 3 alive neighbours`, () => {
                    expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 0, 0)).toEqual(3)
                });
                it(`
          ▓|▓|░
          -----
          ▓|▓|░
              ↑ this cell has 2 alive neighbours`, () => {
                    expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 1, 2)).toEqual(2)
                });
                it(`
            ↓
          ▓|▓|░
          -----
          ▓|▓|░  this one has 3 alive neighbours`, () => {
                    expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 0, 1)).toEqual(3)
                });
                it(`
          ▓|▓|░
          -----
          ▓|▓|░ 
          ↑    this cell has 3 alive neighbours`, () => {
                    expect(determineTheAmountOfAliveNeighbours([[1, 1, 0], [1, 1, 0]], 1, 0)).toEqual(3)
                });
                it(`
          ▓|▓|▓
          -----
          ▓|▓|▓
          -----
          ▓|▓|▓ the middle cell has 8 alive neighbours`, () => {
                    expect(determineTheAmountOfAliveNeighbours([[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, 1)).toEqual(8)
            });
        });
    });
    describe(`Now that we know the amount of alive neighbours, we can determine the state of a cell after a tick.`, () => {
            describe(`Looking at one specific cell that is alive, it will`, () => {
                it('die when it only has 1 alive neighbour, because of underpopulation. It takes two to tango, they say.', () => {
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
                it('become alive because of reproduction when there are 3 horny neighbours', () => {
                    expect(determineNextStatusOfCell(0, 3)).toEqual(1)
                });
                it('decide to stay dead because of overpopulation when there are 4. Possibly the cell is quite introvert..', () => {
                    expect(determineNextStatusOfCell(0, 4)).toEqual(0)
                });
            });
    });
});
