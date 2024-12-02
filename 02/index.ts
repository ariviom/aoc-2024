// -------------------------- PART 1 -------------------------- //

const testPath = './02/test-numbers.txt';
const path = './02/numbers.txt';
const reports = Bun.file(path);
const reportsText = await reports.text();

const reportsArray = reportsText.split('\n').map((report) => report.split(' ').map(Number));

let safeTotal = 0;
let safeWithDampenerTotal = 0;
const maxRange = 3;

// Function to determine if the array is initially increasing or decreasing by checking the first two values
function increasingOrDecreasing(array: number[]) {
    return array[0] < array[1] ? 'increase' : 'decrease';
}

function isSafe(array: number[]) {
    // Get the direction of the array
    const direction = increasingOrDecreasing(array);

    // Initialize safe to true
    let safe = true;

    // Iterate through the array
    array.forEach((_, index) => {
        // Skip the last value as there is no next value to compare it to
        if (index === array.length - 1) {
            return;
        }
        // Determine if the array is continuing to increase or decrease
        const continueSafe =
            direction === 'increase'
                ? array[index] - array[index + 1] < 0
                : array[index] - array[index + 1] > 0;

        // Determine if the array is safe and within "max range" using absolute value
        safe = safe && continueSafe && Math.abs(array[index + 1] - array[index]) <= maxRange;
        return;
    });
    return safe;
}

reportsArray.forEach((report) => {
    if (isSafe(report)) {
        safeTotal++;
    }
});

// Log the total number of safe reports
console.log('safe reports: ', safeTotal);

// -------------------------- PART 2 -------------------------- //

function isSafeWithDampener(array: number[]) {
    // Try removing each number one at a time and check if any variation is safe
    // This is a brute force method, but it works and is simpler than trying to check either end of the array
    for (let i = 0; i < array.length; i++) {
        // Create a new array without the current index
        const modifiedArray = [...array.slice(0, i), ...array.slice(i + 1)];

        // Check if this variation is safe using our original isSafe function
        if (isSafe(modifiedArray)) {
            return true;
        }
    }

    // If no variation works, return false
    return false;
}

reportsArray.forEach((report) => {
    if (isSafeWithDampener(report)) {
        safeWithDampenerTotal++;
    }
});

console.log('safe reports with dampener: ', safeWithDampenerTotal);
