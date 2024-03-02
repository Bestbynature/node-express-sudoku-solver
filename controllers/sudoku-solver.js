class SudokuSolver {

  validate(puzzleString) {
    if(puzzleString.length !== 81) {
      return { error: 'Expected puzzle to be 81 characters long' }
    }
    if(puzzleString.match(/[^0-9.]/)) {
      return { error: 'Invalid characters in puzzle' }
    }
    return true
  }

  checkRowPlacement(puzzleString, row, column, value) {
    
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

