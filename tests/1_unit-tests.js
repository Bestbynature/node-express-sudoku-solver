const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
const { puzzlesAndSolutions } = require("../controllers/puzzle-strings.js");
let solver;

suite("Unit Tests", () => {
  setup(() => {
    solver = new Solver();
  });

  test("Logic handles a valid puzzle string of 81 characters", () => {
    const puzzle = "123456789".repeat(9);
    assert.isTrue(solver.validate(puzzle));
  });

  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
    const puzzle = "12A456789".repeat(9);
    assert.deepStrictEqual(solver.validate(puzzle), {
      error: "Invalid characters in puzzle",
    });
  });

  test("Logic handles a puzzle string that is not 81 characters in length", () => {
    const puzzle = "123456789".repeat(8);
    assert.deepStrictEqual(solver.validate(puzzle), {
      error: "Expected puzzle to be 81 characters long",
    });
  });

  puzzlesAndSolutions.forEach(([puzzle, solution]) => {
    test("Valid puzzle strings pass the solver", () => {
      assert.isObject(solver.solve(puzzle));
      assert.property(solver.solve(puzzle), "solution");
      assert.strictEqual(solver.solve(puzzle).solution, solution);
    });

    test('Invalid puzzle strings fail the solver', () => {
      const puzzle = "123456789".repeat(8);
      assert.property(solver.solve(puzzle), "error");
    });
  

    test("Solver returns the expected solution for an incomplete puzzle", () => {
      const invalidPuzzle = "1134.66.9".repeat(9)
      const expectedSolution  = { error: 'Puzzle cannot be solved' }
      const actualSolution = JSON.stringify(solver.solve(invalidPuzzle));
      const expectedSolutionString = JSON.stringify(expectedSolution);

      assert.strictEqual(actualSolution, expectedSolutionString);
    });

    test("Logic handles a valid row placement", () => {
      const puzzle = "123456789".repeat(9);
      const result = solver.checkRowPlacement(puzzle, 0, 0, "0");
      assert.isTrue(result);
    });

    test('Logic handles an invalid row placement', () => {
      const puzzle = "123456789".repeat(9);
      assert.isFalse(solver.checkRowPlacement(puzzle, 0, 0, '2'));
    });

    test('Logic handles a valid column placement', () => {
      const puzzle = "123456789".repeat(9);
      assert.isTrue(solver.checkColPlacement(puzzle, 0, 0, '2'));
    });

    test('Logic handles an invalid column placement', () => {
      const puzzle = "123456789".repeat(9);
      assert.isFalse(solver.checkColPlacement(puzzle, 0, 0, '1'));
    });

    test('Logic handles a valid region (3x3 grid) placement', () => {
      const puzzle = "123456789".repeat(9);
      assert.isTrue(solver.checkRegionPlacement(puzzle, 0, 0, '4'));
    });

    test('Logic handles an invalid region (3x3 grid) placement', () => {
      const puzzle = "123456789".repeat(9);
      assert.isFalse(solver.checkRegionPlacement(puzzle, 0, 0, '2'));
    });
  
  });

});
