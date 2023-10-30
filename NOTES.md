# Scenario for blinker (vertical --> horizontal) ✅

## Create a generateNextTick function ✅
This calls determineTheAmountOfAliveNeighbours and determineNextStatusOfCell

Result: determineTheAmountOfAliveNeighbours does something weird and errors.
This is the result of calling the function wrong.

# Scenario for glider ✅

- Build end to end scenario for glider ✅

No new code needed, yippieeeeee!!!!! ✅ ✅ ✅ ☠ ☠ ☠ ☠ ☠

# Scenario for block ✅

- Build end to end scenario for block ✅

No new code needed, yippieeeeee!!!!! ✅ ✅ ✅ ☠ ☠ ☠ ☠ ☠

# Scenario for Pulsar 🙌

- Build end to end scenario for Pulsar 🙌

# Homework for 27-09

## ✅ Homework 1: find improvements to make the test report read like a book
## 🙌 Homework 2: Improve the readability and understandability of the test suite
### Improvement 1: split into unit and component test suites
It seems that the test suite (legacy.test.js) is a mix of unit and component tests. For example, this suite contains tests for determineTheAmountOfAliveNeighbours, which is actually a component. While determineIfThereIsUnderpopulation is also tested, which is a unit. This makes the test suite hard to read and understand. Try to split the test suite into a unit and component test suite.

✅ - Create separate test suites for unit and component tests
✅ - Move component tests
✅ - Move unit tests
✅ - Make the component test suite read like a book
🙌- Make the unit test suite read like a book
- Check for stuff that is uncovered
### Improvement 2: use doubles
No doubles are used, which leads to a lot of duplication in the test suite. Try to use doubles to reduce the duplication.

Homework 3: Improve the code as best as you can to reduce the cyclomatic complexity below 4 and the code should like reading a book
### ✅ Improvement 1: reduce cyclomatic complexity
The following functions need to be refactored to reduce the cyclomatic complexity:
- isThereANeighbourAliveDownUnder
- isThereANeighbourAliveDownUnderToTheRight
- isThereANeighbourAliveDownUnderToTheLeft
- isThereANeighbourAliveAboveToTheLeft
- isThereANeighbourAliveAboveToTheRight
- isThereANeighbourAliveRightAbove
- determineNextStatusOfCell

### Improvement 2: improve readability
✅ -- Improve determineNextStatusOfCell
✅ -- Split into dead and alive versions
✅ -- apply Guard Clauses
✅ -- Create/update unit tests
✅ -- Update component tests
✅ -- shouldCellDie should return Alive or Dead
✅ - apply ALIVE / DEAD constants consequently
✅ - minimize duplication in 'isThereANeighbourAliveSomewhere' functions
✅ -- Make functions more readable

✅ Homework 4: Try to migrate to TypeScript

🔍 A warning about Jest is visible in the terminal. Don't know how to solve this and this does not seem a priority for now.

✅ Homework 5: refactor testsuites

# API

## POST start game
- E2E: User starts a new Game of Life
✅ - Create the API and the POST call scaffolding
✅ - Create a test for the POST call, for a simple universe with ReadyAPI

{
  "width": 20,
  "height": 20,
  "pattern": "GLIDER"
}
✅ - Make the API return the universe
✅ - Add enumeration value for pattern name to API

- Adhere to the openAPI spec
✅ - tickNumber should be 0
✅- universe should be filled

- Component: start a new game!
✅-- Dimensions
✅-- Glider

- Unit: add pattern to universe
✅-- Glider
✅-- Blinker
✅-- Beehive
🙌-- Random

- E2E: User generates a new tick
✅ - Create test
✅ - Implement the functionality in the API to generate the next tick

-



*QUESTION FOR THE ITALIAN GURU*
- When to use cucumber? E2E in cypress seems logical, but we already use it here for components (glider, blinker)