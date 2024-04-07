'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;

      if (!puzzle || !coordinate || value === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      const validationResult = solver.validate(puzzle);
      if (validationResult !== true) {
        return res.json(validationResult);
      }

      const isCoordinateValid = /^[A-Ia-i][1-9]$/.test(coordinate);
      if (!isCoordinateValid) {
        return res.json({ error: 'Invalid coordinate' });
      }

      const isValueValid = /^[1-9]$/.test(value);
      if (!isValueValid) {
        return res.json({ error: 'Invalid value' });
      }

      const row = coordinate[0].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
      const column = parseInt(coordinate[1]) - 1;

      if (puzzle[row * 9 + column] !== '.') {
        // Check if the value is already placed in the puzzle on that coordinate
        return res.json({ valid: true });
      }

      const isPlacementValid = solver.checkRowPlacement(puzzle, row, column, value) &&
        solver.checkColPlacement(puzzle, row, column, value) &&
        solver.checkRegionPlacement(puzzle, row, column, value);

      if (!isPlacementValid) {
        const conflict = [];

        if (!solver.checkRowPlacement(puzzle, row, column, value)) {
          conflict.push('row');
        }

        if (!solver.checkColPlacement(puzzle, row, column, value)) {
          conflict.push('column');
        }

        if (!solver.checkRegionPlacement(puzzle, row, column, value)) {
          conflict.push('region');
        }

        return res.json({ valid: false, conflict });
      }

      return res.json({ valid: true });
    });

  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;

      if (!puzzle || puzzle.length < 0) {
        return res.json({ error: 'Required field missing' });
      }

      const validationResult = solver.validate(puzzle);
      if (validationResult !== true) {
        return res.json(validationResult);
      }

      const solvedPuzzle = solver.solve(puzzle);

      if (!solvedPuzzle || solvedPuzzle === null || !solvedPuzzle.solution) {
        return res.json({ error: 'Puzzle cannot be solved' });
      }

      return res.json({ solution: solvedPuzzle.solution });
    });
};
