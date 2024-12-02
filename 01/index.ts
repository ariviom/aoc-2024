// -------------------------- PART 1 -------------------------- //

const path = "./01/numbers.txt";
const numbers = Bun.file(path);
const numbersText = await numbers.text();

const numbersLinesArray = numbersText.split("\n");

const leftCol: number[] = [];
const rightCol: number[] = [];

numbersLinesArray.forEach((line) => {
    const [left, right] = line.split("   ");
    leftCol.push(parseInt(left));
    rightCol.push(parseInt(right));
});

const sortedLeftCol = leftCol.sort((a, b) => a - b);
const sortedRightCol = rightCol.sort((a, b) => a - b);

function getDistanceBetweenTwoNumbers(a: number, b: number) {
    return Math.abs(a - b);
}

const distancesArray: number[] = [];

sortedLeftCol.forEach((left, index) => {
    const right = sortedRightCol[index];
    const distance = getDistanceBetweenTwoNumbers(left, right);
    distancesArray.push(distance);
});

const sum = distancesArray.reduce((acc, curr) => acc + curr, 0);

console.log("sum:", sum);

// -------------------------- PART 2 -------------------------- //

function frequencyInArray(value: number, array: number[]) {
    return array.filter((num) => num === value).length;
}

const frequencies: number[] = [];

leftCol.forEach((num) => {
    const occurrencesinRightCol = frequencyInArray(num, rightCol);
    frequencies.push(occurrencesinRightCol);
})

const frequencyMultValues: number[] = [];

leftCol.forEach((num, index) => {
    const frequency = frequencies[index];
    const value = num * frequency;
    frequencyMultValues.push(value);
})

const sumMultValues = frequencyMultValues.reduce((acc, curr) => acc + curr, 0);

console.log("sum mult values:", sumMultValues);
