const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {

  setup(() => {
    solver = new Solver();
  });

  test('Logic handles a valid puzzle string of 81 characters', () => {
    const puzzle = "123456789".repeat(9);
    assert.isTrue(solver.validate(puzzle));
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
    const puzzle = "12A456789".repeat(9);
    assert.deepStrictEqual(solver.validate(puzzle), { error: 'Invalid characters in puzzle' });
  });

  test('Logic handles a puzzle string that is not 81 characters in length', () => {
    const puzzle = "123456789".repeat(8);
    assert.deepStrictEqual(solver.validate(puzzle), { error: 'Expected puzzle to be 81 characters long' });
  });

  test('Logic handles a valid row placement', () => {
    const puzzle = "123456789".repeat(9);
    assert.isTrue(solver.checkRowPlacement(puzzle, 0, 0, '1'));
  });

  test('Logic handles an invalid row placement', () => {
    const puzzle = "123456789".repeat(9);
    assert.isFalse(solver.checkRowPlacement(puzzle, 0, 0, '2'));
  });

  test('Logic handles a valid column placement', () => {
    const puzzle = "123456789".repeat(9);
    assert.isTrue(solver.checkColPlacement(puzzle, 0, 0, '1'));
  });

  test('Logic handles an invalid column placement', () => {
    const puzzle = "123456789".repeat(9);
    assert.isFalse(solver.checkColPlacement(puzzle, 0, 0, '2'));
  });

  test('Logic handles a valid region (3x3 grid) placement', () => {
    const puzzle = "123456789".repeat(9);
    assert.isTrue(solver.checkRegionPlacement(puzzle, 0, 0, '1'));
  });

  test('Logic handles an invalid region (3x3 grid) placement', () => {
    const puzzle = "123456789".repeat(9);
    assert.isFalse(solver.checkRegionPlacement(puzzle, 0, 0, '2'));
  });

  test('Valid puzzle strings pass the solver', () => {
    const puzzle = "53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79";
    assert.isString(solver.solve(puzzle));
  });

  test('Invalid puzzle strings fail the solver', () => {
    const puzzle = "123456789".repeat(8);
    assert.deepStrictEqual(solver.solve(puzzle), { error: 'Puzzle cannot be solved' });
  });

  test('Solver returns the expected solution for an incomplete puzzle', () => {
    const puzzle = "53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79";
    const solution = "534678912672195348198342567859761423426853791713924856961537284287419635345286179";
    assert.strictEqual(solver.solve(puzzle), solution);
  });

});
