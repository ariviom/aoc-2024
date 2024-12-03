// -------------------------- PART 1 -------------------------- //

const testPath1 = './03/test-input-pt1.txt';
const testPath2 = './03/test-input-pt2.txt';
const path = './03/input.txt';
const memory = Bun.file(path);
const memoryText = await memory.text();

// Global regex to find all mul() operations with 1-3 digits
const regex = /mul\(\d{1,3},\d{1,3}\)/g;

// Find regex with match()
const cleanMemoryArray = memoryText.match(regex);

// Map over the array and multiply the values
function parseAndMultiplyValues(array: string[]): number[] {
    return array.map((item) => {
        const values = item.slice(4, item.length - 1).split(',');
        return parseInt(values[0]) * parseInt(values[1]);
    });
}

// If statement to check for matches that aren't null
if (cleanMemoryArray) {
    const multipliedMemoryArray = parseAndMultiplyValues(cleanMemoryArray);

    // Reduce the array to a sum
    const sumMultipliedMemoryArray = multipliedMemoryArray?.reduce((acc, curr) => acc + curr, 0);

    console.log(sumMultipliedMemoryArray);
} else {
    console.log('No matches found');
}

// -------------------------- PART 2 -------------------------- //

// Split the memoryText by "don't()"
const dontArray = memoryText.split("don't()");
// Map over the array and split each item by "do()". Slice the first item to remove any code before the first "do()". If the index is 0, return the item as is.
const doArray = dontArray.map((item, index) => {
    if (index === 0) {
        return item;
    }
    // Make sure array includes "do()"
    if (item.includes('do()')) {
        // Split the item by "do()" and slice the first item to remove any code before the first "do()"
        return item.split('do()').slice(1);
    }
    // If the item does not include "do()", return undefined (this will be filtered out later)
    return undefined;
});

// Filter out any null items and join the array back to a single string
const filteredDoArray = doArray.filter((item) => item !== undefined).join('');

// Find regex with match()
const cleanDoArray = filteredDoArray?.match(regex);

// Map over the array and multiply the values
if (cleanDoArray) {
    const multipliedDoArray = parseAndMultiplyValues(cleanDoArray);

    // Reduce the array to a sum
    const sumMultipliedDoArray = multipliedDoArray?.reduce((acc, curr) => acc + curr, 0);

    console.log(sumMultipliedDoArray);
} else {
    console.log('No matches found');
}
