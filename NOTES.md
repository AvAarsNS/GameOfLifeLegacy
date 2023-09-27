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


Homework 4: Try to migrate to TypeScript