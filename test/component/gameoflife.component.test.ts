import { determineTheAmountOfAliveNeighbours,
        determineNextStatusOfCell, 
        DEAD,
        ALIVE,
        startNewGame} 
        from '../../src/gameoflife';
import { NO_CELLS_ALIVE, TOP_LEFT, moreThanThreeNeighbours, noAliveNeighbours, oneNeighbour, threeNeighbours, twentyByTwentyUniverseWithAGliderInTheTopLeftCorner, twoNeighbours } from '../doubles/stubs';

describe(`This is the component test suite for a finite version of Conways Game of Life.
    The components in this suite all revolve around the functionality of a Tick. Which causes a Universe to proceed to its next state.
    In this next state, the status of a cell can change. A cell can remain unchanged, die or become alive.`, () => {
    describe(`So we have to determine the next status of a cell. This is done based on its current status and the amount of alive neighbours.`, () => {
            describe(`Looking at one specific cell that is alive, it will`, () => {
                it('die when it only has 1 alive neighbour, because of underpopulation. It takes two to tango, they say.', () => {
                    expect(determineNextStatusOfCell(ALIVE, oneNeighbour)).toEqual(DEAD)
                });
                it('stay alive when it has 2 because a there is a stable environment', () => {
                    expect(determineNextStatusOfCell(ALIVE, twoNeighbours)).toEqual(ALIVE)
                });
                it('also stay alive when there are 3, because of reproduction', () => {
                    expect(determineNextStatusOfCell(ALIVE, threeNeighbours)).toEqual(ALIVE)
                });
                it('die with more than 3 neighbours, by overpopulation', () => {
                    expect(determineNextStatusOfCell(ALIVE, moreThanThreeNeighbours)).toEqual(DEAD)
                });
            });
            describe('When a cell is dead, it will', () => {
                it('stay dead when it only has 1 living neighbour, because of underpopulation', () => {
                    expect(determineNextStatusOfCell(DEAD, oneNeighbour)).toEqual(DEAD)
                });
                it('also stay dead when there are 2, because a there is a stable environment', () => {
                    expect(determineNextStatusOfCell(DEAD, twoNeighbours)).toEqual(DEAD)
                });
                it('become alive because of reproduction when there are 3 horny neighbours', () => {
                    expect(determineNextStatusOfCell(DEAD, threeNeighbours)).toEqual(ALIVE)
                });
                it('decide to stay dead because of overpopulation when there are more than 3 neighbours. Possibly the cell is quite introvert..', () => {
                    expect(determineNextStatusOfCell(DEAD, moreThanThreeNeighbours)).toEqual(DEAD)
                });
            });
    });
});

describe('This is a component test suite for the API functionality of the Game of Life!', () => {
    describe('The first step in the game is to start a new game', () => {
        it('When the game is started, the requested universe should be returned', () => {
            const height: number = 20;
            const width: number = 20;
            const pattern: string = 'glider';

            const newUniverse = startNewGame(height, width, pattern);

            expect(newUniverse).toEqual(twentyByTwentyUniverseWithAGliderInTheTopLeftCorner);
        });
    });
});
