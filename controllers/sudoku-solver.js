class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return { error: 'Expected puzzle to be 81 characters long' };
    }
    if (puzzleString.match(/[^0-9.]/)) {
      return { error: 'Invalid characters in puzzle' };
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowStart = row * 9;
    const rowEnd = rowStart + 9;

    for (let i = rowStart; i < rowEnd; i++) {
        if (puzzleString[i] === value) {
            return false;
        }
    }
    return true;
}

  checkColPlacement(puzzleString, row, column, value) {
    const colStart = column;
    const colEnd = 81 + column % 9;

    for (let i = colStart; i < colEnd; i += 9) {
      if (puzzleString[i] === value) {
        return false;
      }
    }

    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const regionStartRow = Math.floor(row / 3) * 3;
    const regionStartCol = Math.floor(column / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellRow = regionStartRow + i;
        const cellCol = regionStartCol + j;
        const index = cellRow * 9 + cellCol;

        if (puzzleString[index] === value) {
          return false;
        }
      }
    }

    return true;
  }

  // solve(puzzleString) {
  //   const solvePuzzle = (puzzle) => {
  //     const emptyCellIndex = puzzle.indexOf('.');

  //     if (emptyCellIndex === -1) {
  //       return puzzle; // Puzzle is solved
  //     }

  //     const row = Math.floor(emptyCellIndex / 9);
  //     const col = emptyCellIndex % 9;

  //     for (let value = 1; value <= 9; value++) {
  //       const valueChar = String(value);

  //       if (
  //         this.checkRowPlacement(puzzle, row, col, valueChar) &&
  //         this.checkColPlacement(puzzle, row, col, valueChar) &&
  //         this.checkRegionPlacement(puzzle, row, col, valueChar)
  //       ) {
  //         const newPuzzle = puzzle.split('');
  //         newPuzzle[emptyCellIndex] = valueChar;
  //         const result = solvePuzzle(newPuzzle.join(''));

  //         if (result !== null) {
  //           return result;
  //         }
  //       }
  //     }

  //     return null; // No valid value found for this cell
  //   };

  //   const solvedPuzzle = solvePuzzle(puzzleString);

  //   return solvedPuzzle;
  // }

  solve(puzzleString) {
    // Check if puzzleString is missing or empty
    if (!puzzleString) {
      return { error: 'Required field missing' };
    }

    // Validate puzzleString
    const validation = this.validate(puzzleString);
    if (validation !== true) {
      return validation;
    }

    const solvePuzzle = (puzzle) => {
      const emptyCellIndex = puzzle.indexOf('.');

      if (emptyCellIndex === -1) {
        return puzzle; // Puzzle is solved
      }

      const row = Math.floor(emptyCellIndex / 9);
      const col = emptyCellIndex % 9;

      for (let value = 1; value <= 9; value++) {
        const valueChar = String(value);

        if (
          this.checkRowPlacement(puzzle, row, col, valueChar) &&
          this.checkColPlacement(puzzle, row, col, valueChar) &&
          this.checkRegionPlacement(puzzle, row, col, valueChar)
        ) {
          const newPuzzle = puzzle.split('');
          newPuzzle[emptyCellIndex] = valueChar;
          const result = solvePuzzle(newPuzzle.join(''));

          if (result !== null) {
            return result;
          }
        }
      }

      return null; // No valid value found for this cell
    };

    const solvedPuzzle = solvePuzzle(puzzleString);

    // Check if the puzzle is solvable
    if (solvedPuzzle === null) {
      return { error: 'Puzzle cannot be solved' };
    }

    return { solution: solvedPuzzle };
  }
}

module.exports = SudokuSolver;
