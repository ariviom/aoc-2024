// -------------------------- PART 1 -------------------------- //

const testPath = './04/test-input.txt';
const path = './04/input.txt';
const crossword = Bun.file(path);
const crosswordText = await crossword.text();

// Split the crosswordText by new lines
const crosswordArray = crosswordText.split('\n');

// Map over the array and split each item by letter
const crosswordArray2 = crosswordArray.map((item) => item.split(''));

const directions = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
    [1, 1], // Down-right
    [1, -1], // Down-left
    [-1, 1], // Up-right
    [-1, -1], // Up-left
];

function searchFrom(
    grid: string[][],
    word: string,
    row: number,
    col: number,
    dx: number,
    dy: number
) {
    const rows = grid.length;
    const cols = grid[0].length;

    for (let i = 0; i < word.length; i++) {
        const newRow = row + i * dx;
        const newCol = col + i * dy;

        // Check if the position is out of bounds
        if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
            return false;
        }

        // Check if the character matches
        if (grid[newRow][newCol] !== word[i]) {
            return false;
        }
    }
    return true;
}

function findWord(grid: string[][], word: string) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    // iterate over each row
    for (let row = 0; row < rows; row++) {
        // iterate over each column
        for (let col = 0; col < cols; col++) {
            // iterate over each direction
            for (const [dx, dy] of directions) {
                // if the word is found, return the start and direction
                if (searchFrom(grid, word, row, col, dx, dy)) {
                    count++;
                }
            }
        }
    }

    return count;
}

console.log(findWord(crosswordArray2, 'XMAS'));

// -------------------------- PART 2 -------------------------- //

const diagonalDirections = [
    [1, 1], // Down-right
    [1, -1], // Down-left
    [-1, 1], // Up-right
    [-1, -1], // Up-left
];

function searchForIndexOfLetterInWord(
    grid: string[][],
    word: string,
    letter: string,
    row: number,
    col: number,
    dx: number,
    dy: number
) {
    const rows = grid.length;
    const cols = grid[0].length;
    let letterIndex;

    for (let i = 0; i < word.length; i++) {
        const newRow = row + i * dx;
        const newCol = col + i * dy;

        // Check if the position is out of bounds
        if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
            return false;
        }

        // Check if the character matches
        if (grid[newRow][newCol] !== word[i]) {
            return false;
        }
        if (word[i] === letter) {
            // Add a separator to avoid overlap between rows and columns (e.g. col 12, row 3 would appear the same as col 1 row 23).
            // Not adding the separator is what messed me up for a while...
            letterIndex = newRow.toString() + '_' + newCol.toString();
        }
    }
    return letterIndex;
}

function findWordsWithOverlappingIndexes(grid: string[][], word: string, letter: string) {
    const rows = grid.length;
    const cols = grid[0].length;
    let indexes: string[] = [];

    // iterate over each row
    for (let row = 0; row < rows; row++) {
        // iterate over each column
        for (let col = 0; col < cols; col++) {
            // iterate over each direction
            for (const [dx, dy] of diagonalDirections) {
                // if the word is found, return the start and direction
                const indexSearch = searchForIndexOfLetterInWord(
                    grid,
                    word,
                    letter,
                    row,
                    col,
                    dx,
                    dy
                );
                // Being a bit more explicit here, since we could have false or undefined values
                if (!!indexSearch) {
                    indexes.push(indexSearch);
                }
            }
        }
    }

    return indexes;
}

const letterIndexes = findWordsWithOverlappingIndexes(crosswordArray2, 'MAS', 'A');

// Filter our unique indexes, as they wouldn't overlap in an X
const duplicateIndexes = letterIndexes.filter(
    (value) => letterIndexes.indexOf(value) !== letterIndexes.lastIndexOf(value)
);

// We're looking for the number of overlaps, so divide by 2
console.log(duplicateIndexes.length / 2);
